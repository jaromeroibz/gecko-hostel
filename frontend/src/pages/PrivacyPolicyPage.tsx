import { SEOHead } from '../components/seo/SEOHead'

const LAST_UPDATED = 'June 30, 2026'

export function PrivacyPolicyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy | Gecko Surf House"
        description="Privacy policy for Gecko Surf House — how we collect, use, and protect your personal data."
        path="/privacy"
      />

      <div className="pp-root">

        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="pp-header">
          <p className="pp-eyebrow font-label">Legal</p>
          <h1 className="pp-title font-display">Privacy Policy</h1>
          <p className="pp-meta font-label">Last updated: {LAST_UPDATED}</p>
        </div>

        {/* ── Content ───────────────────────────────────────────────── */}
        <div className="pp-body">

          <section className="pp-section">
            <p className="pp-lead">
              Gecko Surf House ("we", "us", "our") is a boutique surf hostel located in Santa Teresa,
              Puntarenas, Costa Rica. This policy explains what personal data we collect, why we collect
              it, and your rights regarding that data.
            </p>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2 font-display">1. Data We Collect</h2>
            <p className="pp-p">When you interact with our website or make a booking, we may collect:</p>
            <ul className="pp-list">
              <li><strong>Identity data:</strong> name</li>
              <li><strong>Contact data:</strong> email address, phone/WhatsApp number</li>
              <li><strong>Booking data:</strong> arrival and departure dates, number of guests, room or package selected</li>
              <li><strong>Payment data:</strong> processed by PayPal — we never store card numbers or payment credentials</li>
              <li><strong>Communication data:</strong> messages sent through our contact or inquiry forms</li>
            </ul>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2 font-display">2. How We Use Your Data</h2>
            <ul className="pp-list">
              <li>To process and confirm your reservation</li>
              <li>To communicate with you about your stay (pre-arrival info, check-in instructions)</li>
              <li>To respond to inquiries sent through our contact or package inquiry forms</li>
              <li>To improve our services and website</li>
            </ul>
            <p className="pp-p">We do not sell your personal data to third parties.</p>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2 font-display">3. Third-Party Services</h2>
            <p className="pp-p">
              We work with the following services, each of which has its own privacy policy:
            </p>
            <div className="pp-table-wrap">
              <table className="pp-table">
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lodgify</td>
                    <td>Booking engine and property management</td>
                  </tr>
                  <tr>
                    <td>Booking.com</td>
                    <td>Online travel agency channel</td>
                  </tr>
                  <tr>
                    <td>Airbnb</td>
                    <td>Online travel agency channel</td>
                  </tr>
                  <tr>
                    <td>PayPal</td>
                    <td>Payment processing</td>
                  </tr>
                  <tr>
                    <td>Cloudinary</td>
                    <td>Image hosting and delivery</td>
                  </tr>
                  <tr>
                    <td>Resend</td>
                    <td>Transactional email delivery</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2 font-display">4. Cookies</h2>
            <p className="pp-p">
              Our website uses cookies primarily through the Lodgify booking widget embedded on booking
              pages. These cookies are necessary for the booking engine to function (session management,
              availability lookup). We do not use advertising or tracking cookies.
            </p>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2 font-display">5. Data Retention</h2>
            <p className="pp-p">
              We retain booking and contact records for up to 3 years after your stay for accounting and
              customer service purposes. You may request deletion at any time (see section 6).
            </p>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2 font-display">6. Your Rights</h2>
            <p className="pp-p">You have the right to:</p>
            <ul className="pp-list">
              <li><strong>Access</strong> the personal data we hold about you</li>
              <li><strong>Correct</strong> inaccurate data</li>
              <li><strong>Delete</strong> your data (subject to legal retention obligations)</li>
              <li><strong>Object</strong> to processing for marketing purposes</li>
              <li><strong>Portability</strong> — receive your data in a structured, machine-readable format</li>
            </ul>
            <p className="pp-p">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:geckosurfhousecr@gmail.com" className="pp-link">
                geckosurfhousecr@gmail.com
              </a>.
              We will respond within 30 days.
            </p>
          </section>

          <section className="pp-section">
            <h2 className="pp-h2 font-display">7. Contact</h2>
            <p className="pp-p">
              Gecko Surf House<br />
              Santa Teresa, Puntarenas, Costa Rica<br />
              <a href="mailto:geckosurfhousecr@gmail.com" className="pp-link">
                geckosurfhousecr@gmail.com
              </a>
            </p>
          </section>

        </div>
      </div>

      <style>{`
        .pp-root {
          max-width: 760px;
          margin: 0 auto;
          padding: clamp(3rem, 8vw, 6rem) clamp(1.25rem, 5vw, 2rem) clamp(4rem, 8vw, 7rem);
        }

        /* ── Header ── */
        .pp-header {
          margin-bottom: 3.5rem;
          padding-bottom: 2rem;
          border-bottom: 1.5px solid rgba(6, 78, 59, 0.1);
        }

        .pp-eyebrow {
          font-size: 0.55rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #b85c3a;
          margin: 0 0 0.75rem;
        }

        .pp-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #064E3B;
          margin: 0 0 1rem;
        }

        .pp-meta {
          font-size: 0.8rem;
          color: rgba(6, 78, 59, 0.4);
          margin: 0;
        }

        /* ── Body ── */
        .pp-body {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .pp-section {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }

        .pp-lead {
          font-size: 1.05rem;
          line-height: 1.75;
          color: rgba(6, 30, 20, 0.7);
          margin: 0;
        }

        .pp-h2 {
          font-size: 1.35rem;
          letter-spacing: -0.02em;
          color: #064E3B;
          margin: 0;
        }

        .pp-p {
          font-size: 0.9375rem;
          line-height: 1.75;
          color: rgba(6, 30, 20, 0.65);
          margin: 0;
        }

        .pp-list {
          padding-left: 1.25rem;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .pp-list li {
          font-size: 0.9375rem;
          line-height: 1.65;
          color: rgba(6, 30, 20, 0.65);
        }

        .pp-list li strong {
          color: #064E3B;
          font-weight: 600;
        }

        .pp-link {
          color: #064E3B;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }

        .pp-link:hover {
          color: #b85c3a;
        }

        /* ── Table ── */
        .pp-table-wrap {
          overflow-x: auto;
          border-radius: 0.75rem;
          border: 1px solid rgba(6, 78, 59, 0.1);
        }

        .pp-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }

        .pp-table thead {
          background: rgba(6, 78, 59, 0.05);
        }

        .pp-table th {
          text-align: left;
          padding: 0.75rem 1.25rem;
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(6, 78, 59, 0.5);
          font-weight: 600;
          border-bottom: 1px solid rgba(6, 78, 59, 0.08);
        }

        .pp-table td {
          padding: 0.75rem 1.25rem;
          color: rgba(6, 30, 20, 0.65);
          border-bottom: 1px solid rgba(6, 78, 59, 0.06);
          line-height: 1.5;
        }

        .pp-table tbody tr:last-child td {
          border-bottom: none;
        }

        .pp-table tbody tr:hover {
          background: rgba(6, 78, 59, 0.02);
        }

        .pp-table td:first-child {
          font-weight: 600;
          color: #064E3B;
          white-space: nowrap;
        }
      `}</style>
    </>
  )
}
