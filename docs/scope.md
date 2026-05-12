# Gecko Hostel — Project Scope & Architecture

**Last updated:** 2026-05-11 (stakeholder decisions + home marketing pass + `ui-direction.md`)  
**Purpose:** Single source of truth for stack, patterns, product direction, and delivery rules. Update this file as features ship.

**Visual & UX philosophy (canonical):** See [`docs/ui-direction.md`](./ui-direction.md) — luxury editorial minimalism, cinematic surf photography, and anti-patterns (no Beach Break clone, no generic Tailwind “template” look).

---

## 1. Current project architecture

### Monorepo layout

| Area | Path | Role |
|------|------|------|
| Public SPA | `frontend/` | Vite + React + TypeScript; marketing pages, booking shell, Lodgify integration |
| API & admin data | `backend/` | Flask REST API, SQLAlchemy models, JWT for admin, Alembic migrations |
| Documentation | `docs/` | This scope and future product/tech notes |

### Request flow (high level)

- **Browser** → static/hosted **Vite build** for `/`, `/booking`, `/contact`, `/admin/*`.
- **Frontend** calls **`VITE_API_BASE_URL`** (default `http://127.0.0.1:5000/api`) for extras, and **`adminApi`** with JWT for protected admin routes.
- **Booking engine** is **Lodgify** (external): portable search script + properties URL in iframe or deep links; Gecko Hostel does not own availability or payment in-app.

### Backend composition

- **Flask app factory** in `backend/app/__init__.py`: registers `api` blueprint at `/api`, CORS for `/api/*`, JWT, SQLAlchemy, Migrate.
- **Blueprints / routes:** `health`, `auth` (login), `extras` (CRUD with JWT on mutations), `packages`, `images`, `booking_extras` (guest POST to record interest + extras).
- **Database:** PostgreSQL by default (`DATABASE_URL`); migrations under `backend/migrations/`.

### Frontend composition

- **Entry:** `frontend/src/main.tsx` — `StrictMode`, `BrowserRouter`, **`SelectedExtrasProvider`** wrapping the tree, `index.css`.
- **Routing:** `frontend/src/App.tsx` — nested routes: `MainLayout` (Navbar + `Outlet` + Footer) for public pages; isolated branch for `/admin` behind `RequireAdminAuth` with lazy-loaded `AdminPage`.
- **Admin UI:** Full-viewport shell (`AdminLayout`) imports **Bootstrap 5 CSS + Bootstrap Icons** (admin only); public marketing UI uses **Tailwind** only.

---

## 2. Stack and dependencies

### Frontend (`frontend/package.json`)

| Technology | Version (approx.) | Notes |
|------------|-------------------|--------|
| React | ^19.2.x | |
| react-router-dom | ^7.14.x | File-based route config in `App.tsx` |
| Vite | ^8.x | Build tool |
| TypeScript | ~6.x | |
| Tailwind CSS | ^4.2.x | `@tailwind` directives in `src/index.css`; `tailwind.config.js` extends `primary` / `dark` |
| Tailwind PostCSS | `@tailwindcss/postcss` | |
| ESLint | ^10.x | Flat config `eslint.config.js` |
| bootstrap / bootstrap-icons | ^5.3 / ^1.11 | **Admin shell only** (`AdminLayout.tsx`) |

**Environment variables (frontend, observed in code)**

- `VITE_API_BASE_URL` — Flask API base.
- `VITE_LODGIFY_PROPERTIES_URL` / `VITE_LODGIFY_BOOKING_URL` — override Lodgify URLs.
- `VITE_LODGIFY_SEARCH_LANGUAGE` — optional override for portable search bar `data-language-code` (defaults to **`en`** for English launch; set e.g. `es` if the widget must stay Spanish).
- `VITE_CLOUDINARY_CLOUD_NAME`, `VITE_CLOUDINARY_UPLOAD_PRESET` — image uploads in admin.
- **Planned (not wired yet):** `VITE_WHATSAPP_NUMBER`, map embed URL / place ID, Resend keys — use env-driven modules when those features ship.

### Backend (`backend/requirements.txt`)

- Flask 3.x, Flask-SQLAlchemy, Flask-Migrate, Flask-JWT-Extended, flask-cors, psycopg2-binary, python-dotenv, Werkzeug, etc.

### Third-party services (in code or implied)

- **Lodgify** — booking/search (`LodgifySearchBar`, `Booking` iframe, `useBookingUrl`).
- **Cloudinary** — admin image pipeline (URLs stored via API).
- **Resend / Google Maps / WhatsApp** — **not implemented** in codebase at time of writing; listed as product goals below.

---

## 3. Existing completed features

### Public site

- **Home (`/`):** Full-bleed **hero** (`HomeHero`), **Plan your stay** card with **Lodgify portable search bar** (`LodgifySearchBar` → `/booking`), static **rooms** grid (`HomeRoomsSection` + `data/marketingRooms.ts`), **experiences upsell** (`ExperienceUpsell` + `GET /api/extras`), closing **booking CTA** band (`HomeBookingCtaSection`).
- **Booking (`/booking`):** Resolves dates/adults from URL query (`useLodgifySearchFromRoute`) with localStorage fallback; shows summary strip; **full-width Lodgify iframe** with optional **same-origin DOM filtering** of property cards by title keywords (`gecko`, `la lora`, `paraiso`, `rocamar`); cross-origin fallback message if filtering fails.
- **Contact (`/contact`):** Minimal mailto placeholder (`hello@geckohostel.com`).
- **404:** Catch-all → redirect to `/`.

### Global client behavior

- **`SelectedExtrasContext`:** Persists selected extra **IDs** in `localStorage` (`selected_extras`); used by `ExperienceUpsell` and stub `BookingPage` (see gaps).

### Admin

- **Login:** `/admin/login` → JWT stored via `services/auth.ts`.
- **Protected `/admin`:** Lazy `AdminPage` with tabs: **Images** (Cloudinary + API), **Extras**, **Packages**, **Rooms** (currently **static mock data** in `AdminPage.tsx`), **Settings** placeholder.
- **JWT-guarded API** for mutating extras, packages, images.

### Backend API (representative)

- Public: `GET /api/health`, `GET /api/extras`, `GET /api/extras/:id`, `POST /api/bookings/extras` (guest + dates + selected extras → `BookingReference` + `ExtraBooking` rows; `lodgify_booking_id` placeholder `pending-<uuid>`).
- JWT: login, CRUD extras/packages/images as implemented in route modules.

---

## 4. Pending features & known gaps

| Item | Status | Notes |
|------|--------|--------|
| **Marketing home** | Shipped (v1) | Hero, rooms, Lodgify search, experiences, CTA band; static room copy — iterate on photography and copy |
| **Booking UX** | Partial | Lodgify iframe works; **extras are not shown on `/booking`**; no unified stepper |
| **`BookingPage.tsx`** | Unused | Not wired in `App.tsx`; duplicates “Booking” concept with `Booking.tsx` |
| **`PreBookingSummarySection` / `BookingButton`** | Unused | Exported from `components/booking/` but no route consumes them; `BookingButton` opens **new tab** with configurable delay vs. in-app iframe flow |
| **`usePersistedBookingSearch`** | Orphan? | ISO date keys `gecko_booking_*` — **different keys** from `useLodgifySearchFromRoute` (`lodgify_search_*`); risk of split brain if both used without reconciliation |
| **`ExperienceUpsell` images** | Improved | Uses **`image_url`** from API when set; keyword fallbacks otherwise |
| **Contact** | Minimal | No form, Resend, map, or WhatsApp |
| **Conversion widgets** | Missing | Floating WhatsApp, stronger CTAs sitewide |
| **`POST /api/bookings/extras`** | Not called from SPA | Business rules for *when* to submit (before/after Lodgify) undefined |
| **Navbar “Admin”** | Resolved | **Hidden in production** (`import.meta.env.PROD`); dev builds still show link for staff |
| **`index.html` title** | Improved | `Gecko Hostel` |

---

## 5. UI/UX direction (product)

- **Audience:** Travelers, surfers, backpackers, digital nomads, Costa Rica experience seekers.
- **Feel:** Modern, minimal, tropical, immersive, premium-but-relaxed.
- **Priorities:** Emotional imagery, strong booking CTAs, smooth section rhythm, **mobile-first**, high conversion, clear path to Lodgify checkout.
- **Language:** **English-first for launch**; keep copy consistent. Structure strings in components so **i18n can be added later** (extract to dictionaries or `react-i18next` when needed — no mandate yet).

---

## 6. Coding conventions (observed)

- **TypeScript** throughout React code; functional components; hooks for side effects.
- **Paths:** Feature folders under `components/` (`layout/`, `lodgify/`, `booking/`, `admin/`, `auth/`, `ui/`).
- **API:** Thin `services/api.ts` (public) vs `services/adminApi.ts` (Bearer token).
- **Tailwind on public pages:** Utility-first, slate neutrals + teal accents (`teal-700` CTAs), rounded cards (`rounded-2xl`), subtle shadows.
- **Admin:** Bootstrap grid/components + custom `admin-shell.css`.
- **Lodgify:** Centralized constants in `lib/lodgifyConstants.ts`; URL builders in `utils/lodgifySearchUrl.ts` and `hooks/useBookingUrl.ts`.

---

## 7. Component structure (reference map)

```
frontend/src/
  main.tsx                 # Router + SelectedExtrasProvider
  App.tsx                  # Route table
  index.css                # Tailwind + global body font
  pages/
    HomePage.tsx
    Booking.tsx            # Active booking route (iframe)
    BookingPage.tsx        # Stub / not routed
    ContactPage.tsx
    AdminLoginPage.tsx
    AdminPage.tsx          # Tabbed admin hub
  components/
    layout/                # MainLayout, Navbar, Footer
    lodgify/               # LodgifySearchBar + barrel
    booking/               # BookingButton, PreBookingSummarySection (unused in routes)
    home/                  # HomeHero, HomeStaySearchSection, HomeRoomsSection, HomeBookingCtaSection
    ExperienceUpsell.tsx
    auth/RequireAdminAuth.tsx
    admin/                 # AdminLayout, Sidebar, CRUD pages, ImageUploader, UploadModal
    ui/ModalPortal.tsx
  context/SelectedExtrasContext.tsx
  hooks/                   # Lodgify script, search resolution, booking URL, persisted search
  services/                # api, adminApi, auth
  utils/                   # date YYYYMMDD, lodgify URL helpers
  lib/                     # lodgifyConstants, imageCategories
  data/                    # marketingRooms.ts (static room cards; future API-ready shape)
```

---

## 8. State management approach

- **No global store library** (no Redux/Zustand/React Query).
- **React Context:** `SelectedExtrasProvider` — selected extra IDs + CRUD helpers + `localStorage` sync.
- **URL as state:** `useLodgifySearchFromRoute` reads `?arrival=&departure=&adults=` (YYYYMMDD per Lodgify) and persists valid reads to `localStorage`.
- **Server state:** `useEffect` + `useState` in pages/components (e.g. `ExperienceUpsell`, `AdminPage`); consider React Query later if cache/invalidation grows.
- **Risk:** Two booking-related localStorage namespaces (`lodgify_search_*` vs `gecko_booking_*`) if both hooks are combined without a single source of truth.

---

## 9. Booking flow architecture

### Current implemented path

1. **Discovery:** Home → `LodgifySearchBar` (website id `595112`, language from `VITE_LODGIFY_SEARCH_LANGUAGE` or default **`en`**, `data-search-page-url="/booking"`).
2. **Handoff:** Lodgify script navigates to `/booking` with query params.
3. **Resolution:** `useLodgifySearchFromRoute` validates/persists arrival, departure, adults.
4. **Display:** Summary card + iframe `src = buildLodgifyPropertiesSearchUrl(...)`.
5. **Filtering (best-effort):** MutationObserver + DOM hide for non-Gecko property cards when iframe is same-origin; otherwise user sees all properties with warning banner.
6. **Extras:** Selected in `ExperienceUpsell` on Home; **not** surfaced on `/booking`; backend endpoint exists but **frontend does not submit** booking + extras payload.

### Alternate / unused path

- **`BookingButton` + `useBookingUrl`:** Builds Lodgify URL from `Date` objects, opens **new tab** (optional ~2.6s “Preparing…” delay). Suited to external handoff or marketing CTAs, not currently used in routed pages.

### Conversion & UX notes

- **Friction:** Iframe height fixed at `1000px`; mobile scroll and Lodgify UX are vendor-controlled.
- **Trust:** “Open same search in new tab” escape hatch is good for power users.
- **Gap:** Extras selection should be **visible adjacent to or inside** the booking journey with explicit copy on what happens next (pay on Lodgify vs. staff follow-up).

---

## 10. Future scalability notes

- **Content:** Move room list from hardcoded `AdminPage` state to API + models when ready.
- **Media:** Wire `ExperienceUpsell` to `extra.image_url` and/or `GET /api/images` by category for curated homepage sections.
- **i18n:** If ES/EN both required, introduce `react-i18next` or similar before duplicating strings.
- **Design tokens:** Promote Tailwind theme extensions (spacing, typography scale, brand greens) beyond current `primary` hex in config.
- **Observability:** Add error boundary + logging for Lodgify script failures and API errors.

---

## 11. Design inspiration references

- **Primary external reference:** [Beach Break Nosara](https://beachbreaknosara.com/) — boutique surf hotel + club positioning (see Section 12 for extracted patterns).
- **Internal direction:** Tropical minimalism + premium surf culture + modern travel sites — **not** a pixel clone; adapt rhythm and hierarchy to **Gecko Hostel** brand.

---

## 12. Design system & visual direction

### Source of analysis

The reference site was reviewed via **automated content extraction** (headings, section labels, marketing copy, structural cues). **CSS, fonts, exact colors, and motion were not inspected in a browser.** Treat measurements below as **directional**; validate in browser before locking tokens.

### Extracted patterns (Beach Break Nosara)

| Dimension | Observed / inferred |
|-----------|---------------------|
| **Visual hierarchy** | Strong lifestyle headline (“Surf, Eat, Work, Relax…”), then venue type (“Hotel Rooms & Surf Club”), supporting paragraph, primary **Book** CTA repeated in narrative sections |
| **Typography** | Marketing-led: short punchy headings + longer atmospheric body; section titles in **ALL CAPS** for “Beach life / Travel time” utility modules |
| **Spacing rhythm** | Modular **strip** sections (time, temperature, tides, drive times) — dense “dashboard” of place context; alternates with broader story blocks |
| **Image treatment** | Lifestyle-forward (surf, venue, food); implied full-bleed or large panels typical of surf hospitality (confirm in browser) |
| **Section composition** | Hero → utility/info → room/club/restaurant pillars → amenities grid → social proof (quote) → repeated booking CTAs |
| **CTA placement** | “Book your stay”, “Book now” alongside section goals; newsletter/“loop” capture mentioned in content |
| **Luxury / tropical balance** | **Retro / laid-back** surf copy (“old-school après-surf”, “sun-faded”) vs. premium boutique framing — warmth over glossy minimalism |
| **Navigation UX** | Multi-area venue (hotel, surf club, restaurant, experiences, services) — **mega-menu or deep IA** implied by many labeled areas |
| **Mobile responsiveness** | Expect sticky booking entry and stacked strips; must be validated on real devices |
| **Animation philosophy** | Unknown from extraction; boutique sites often favor **subtle** scroll reveals over heavy parallax |
| **Color palette** | Not reliably extracted; expect **sand/neutral base + ocean accent** common in Nosara surf positioning |
| **Booking conversion strategy** | Lifestyle promise → social proof → **repeat book**; practical travel info reduces anxiety for international arrivals |
| **Emotional feel** | Community hub, repeat visits, “classic beachside retreat” |

### Gecko Hostel adaptation principles

1. **Identity:** Keep Gecko distinct (name, location story, room names already reflected in iframe filter keywords).
2. **Hierarchy:** Hero with **one primary action** (search or book); secondary actions for experiences/contact.
3. **Tropical minimalism:** Fewer utility strips than BB unless they serve Gecko’s story (e.g. surf forecast optional).
4. **Performance:** Prefer optimized images (Cloudinary already in admin pipeline) over huge Unsplash full-bleed without `srcset`.
5. **Premium relaxed:** Generous whitespace, restrained caps, avoid cluttering above the fold with too many metrics.

---

## 13. Animation and interaction patterns (current)

- **Tailwind `motion-safe:`** used on pulse states (e.g. Lodgify loading).
- **Micro-interactions:** `ExperienceCard` hover lift (`hover:-translate-y-1`), ring when selected; `BookingButton` spinner during delayed redirect.
- **Principle:** Prefer **functional** motion (loading, selection) over decorative animation until a global motion guideline exists.

---

## 14. Mobile UX strategy

- **Layout:** `MainLayout` uses `max-w-6xl` + horizontal padding; components use responsive grids (`sm:`, `lg:` breakpoints).
- **Navbar:** Wraps links with `flex-wrap` and capped width on small screens.
- **Booking:** Iframe is the main mobile risk — test scroll, keyboard, and safe areas; consider prominent “open in new tab” on small viewports.
- **Touch:** Card CTAs use full-width or large hit areas where implemented (`ExperienceUpsell`).

---

## 15. Conversion optimization notes

- **Strengths:** Immersive hero + repeated booking anchors; on-home Lodgify search; experiences upsell with default popular selection; English CTAs to `/booking`; rooms grid sets expectations before Lodgify.
- **Gaps:** Contact path still thin; no WhatsApp; extras not yet reinforced on `/booking` (next phase per roadmap); **no analytics hooks documented** in code (add when marketing stack is chosen).
- **Copy:** Lodgify remains system of record for payment; extras messaging on home aligns with “confirm on Lodgify before pay.”

---

## 16. Important development rules (team contract)

1. **Preserve working behavior** — especially Lodgify URL building and iframe filtering guardrails.
2. **Incremental diffs** — small PR-sized changes; no drive-by refactors.
3. **Reuse** — extend `LodgifySearchBar`, `ExperienceUpsell`, layout components before adding parallel patterns.
4. **Ask before** large deletes, route restructures, or new global state layers.
5. **Do not invent** business APIs or Resend/Lodgify webhooks without stakeholder confirmation.
6. **Accessibility:** Preserve semantic headings, iframe `title`, disabled states; extend for forms (labels, errors) when contact ships.
7. **Update this document** when architecture or flows change.

---

## 17. Stakeholder decisions (locked for current phase)

| Topic | Decision |
|--------|-----------|
| **Locale** | **English** primary for launch; remove mixed ES/EN in public UX; structure for future multilingual without big rewrites. |
| **Lodgify** | Remains booking engine; **keep iframe + filtering/search**; improve UX around it only—**no custom booking backend**. |
| **Extras** | Persist visually through flow (next: booking summary on `/booking`); scalable for future email/backend; **no Lodgify sync over-engineering** now. |
| **Contact / Resend / WhatsApp / Maps** | **Placeholder architecture** via env + modular files when implemented; credentials provided later. |
| **Rooms** | **Static marketing** content with **API/Lodgify-ready component shape** (`MarketingRoom` + section component). |
| **Admin nav** | **Hide from public navbar in production**; direct `/admin` routes still work for staff. |
| **Booking architecture** | **No deep refactors** unless necessary; preserve current Lodgify behavior; focus UX/visuals/mobile/conversion first. |

Open items (non-blocking for home): production Lodgify IDs/URLs verification with stakeholder; timing for `POST /api/bookings/extras` when email flow exists.

---

## 18. Summary snapshots (for stakeholders)

### Architecture (one paragraph)

Gecko Hostel is a **React + Vite** SPA with **Tailwind**-styled public pages and a **Flask + PostgreSQL** API for extras, packages, images, and optional booking-extra records. **Lodgify** handles real bookings via an embedded properties experience and portable search. **JWT + Cloudinary** power the internal admin console.

### Detected issues / risks

- Duplicate/unused booking abstractions (`Booking.tsx` vs `BookingPage.tsx` vs `BookingButton` flow).
- Split localStorage keys for booking dates if both persistence hooks are used.
- Booking extras still not summarized on `/booking`; duplicate booking components remain for a later cleanup pass.
- Contact and conversion features largely unbuilt (planned env-driven integration).

### Implementation roadmap (suggested order)

1. ~~**Home phase**~~ — v1 shipped: hero, search, static rooms, experiences, CTA band; English copy; admin link hidden in prod.
2. **Booking phase (next)** — show selected extras in booking summary **without** large architecture refactors; optional light polish on iframe/mobile.
3. **Contact & conversion** — env-driven WhatsApp, Resend, Maps when credentials land.
4. **Tech debt (when approved)** — reconcile `BookingPage` / `usePersistedBookingSearch` vs Lodgify route hook if still painful.

### Recommended next step

**Booking page UX:** surface persisted extras + summary strip alignment with home copy—still **no** custom booking backend or Lodgify sync scope creep.

---

*Living scope document — update as features ship.*
