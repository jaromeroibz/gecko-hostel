# Gecko Hostel — Permanent UI/UX Direction

**Status:** Canonical reference for public marketing UI.  
**Inspiration (philosophy only):** [Beach Break Nosara](https://beachbreaknosara.com/) — emotional pacing, editorial surf hospitality, **not** layout or asset cloning.

---

## Relationship to Beach Break Nosara

Study that reference for **mood**: cinematic photography, breathing room, lifestyle copy rhythm, and confidence in restraint. Gecko Hostel keeps its **own** identity (logo, palette, room names, Lodgify flow). If a implementation choice “looks like Beach Break,” it is probably **too literal**—pull back toward Gecko-specific content and spacing.

---

## Core design philosophy

**One-line style:** Luxury editorial minimalism mixed with immersive tropical surf photography.

The site should feel:

- Cinematic  
- Immersive  
- Premium  
- Calm  
- Modern  
- Emotionally driven  
- Visually breathable  

It should **not** feel like:

- Startup SaaS  
- Generic Tailwind template  
- Crowded hostel booking platform  
- Overdesigned tropical tourism site  

---

## Typography system

**Primary style:** Elegant modern sans serif with an **editorial**, clean luxury hospitality feel—not playful “surf” display type for primary UI.

**Preferred families (target):**

- General Sans  
- Satoshi  
- Neue Montreal  
- Switzer  

**Rules:**

- Large headline scale  
- Generous whitespace  
- Medium / light weights for body; clear step-up for headlines  
- Tight visual hierarchy; minimal simultaneous type scales on one screen  
- Avoid tiny text, dense paragraphs, and excessive bolding  

**Accent typography (optional, sparse only):**

- Subtle handcrafted or surf-adjacent letterforms **only** for micro labels, decorative accents, or one-off section highlights  
- Never dominate navigation, forms, or booking-adjacent UI  

**Font sourcing note:** Some preferred families are commercial or self-hosted. Until licenses are in place, use the **closest lawful substitute** (e.g. high-quality open editorial sans) and document the swap in code comments. Prefer self-hosted or licensed CDN to avoid FOUT and privacy issues.

---

## Layout system

Prioritize:

- Whitespace and breathing room  
- Cinematic imagery as the primary compositional anchor  
- Strong visual pacing between sections  

Use:

- **Oversized** section spacing (`py-24`, `py-28`, `py-32` and generous horizontal padding where appropriate)  
- Large image blocks; restrained UI density  
- Minimal “card walls”—prefer full-bleed or near full-bleed bands with light structure  

Avoid:

- Cramped layouts and dashboard grids  
- Excessive bordered cards and chip clutter  

---

## Image treatment

Photography is the **primary** design element.

Images should feel:

- Cinematic, immersive, warm, natural, slightly moody, lifestyle-driven  

Use:

- Subtle dark overlays and soft gradients  
- Edge-to-edge or near edge-to-edge heroes and section bands  
- Consistent color grading where possible (not neon saturation)  

Avoid:

- Bright stock-tourism clichés  
- Oversaturated “postcard” tropical palettes  

---

## Color system

Restrained, premium palette:

- Warm white  
- Sand  
- Charcoal  
- Muted tropical greens  
- Deep ocean teal **as accent only**  

Accents are **minimal**. Avoid neon tropical UI, heavy multi-stop gradients, and rainbow CTAs.

**Project tokens:** Current `gecko.*` Tailwind tokens (cream, sand, mist, forest, sage, clay) are aligned with this direction—tune saturation and contrast in favor of **calm** over **pop**.

---

## Shape language

- Soft radii: prefer **`rounded-xl`**; cap decorative surfaces around **`rounded-2xl`** unless a single hero device calls for more  
- Organic spacing; subtle asymmetry is welcome when it supports photography  
- Minimal borders; shadows **restrained** and purpose-driven (elevation for legibility, not decoration)  

Avoid:

- Sharp SaaS rectangles everywhere  
- Glassmorphism stacks  
- Shadow-heavy card grids  

---

## Animation philosophy

Motion should feel **cinematic, subtle, slow, smooth, premium**.

Preferred patterns:

- Fade-in, slight upward reveal  
- Gentle image scale on hover (respect `prefers-reduced-motion`)  
- Soft opacity transitions  

**Timing:** roughly **500ms–1200ms**, `ease-out` (or custom cubic-bezier that eases out gently).

Avoid:

- Flashy, bouncy, or aggressive motion  
- Parallax that harms readability or performance  

---

## UX philosophy

Behavior should evoke:

- A premium surf retreat  
- Modern travel editorial  
- An immersive destination brand  

**Not:** a booking dashboard, hostel admin panel, or dense ecommerce UI.

**Emotional flow (ideal):**

1. Feel the destination  
2. Imagine the lifestyle  
3. Explore experiences  
4. Book naturally  

**Not:** “Book now” as the only story—urgency lives **after** context, with clear hierarchy.

---

## Pre-flight checklist (before shipping UI)

Ask:

1. Does this feel **cinematic**?  
2. Does it feel **breathable**?  
3. Does it feel **premium** and **calm**?  
4. Does it feel **immersive** and **editorial**?  

If any answer is **no**: **remove** UI noise before adding new components.

Explicitly avoid:

- Generic Tailwind component aesthetics pasted without customization  
- Startup-style hero + 3 feature cards + logo row defaults  
- Excessive cards, grids, borders, and shadows  

---

## Implementation alignment (living)

| Area | Direction |
|------|-----------|
| **Stack** | React + Tailwind is fine; **tokens and composition** carry the brand, not stock patterns |
| **Booking** | Lodgify remains the engine; UI around it stays calm and trustworthy—no “dashboard” framing on marketing pages |
| **Docs** | Update this file when typography licenses or motion guidelines change |

---

*End of permanent UI/UX direction. Prefer editing this document over scattering one-off rules in code comments.*
