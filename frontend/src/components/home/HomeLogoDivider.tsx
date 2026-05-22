const GECKO_ICON =
  'https://res.cloudinary.com/doow0mhrm/image/upload/v1778622715/background-removed_kzu281.png'

const COUNT = 20

export function HomeLogoDivider() {
  return (
    <div
      className="hdiv-root relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2"
      aria-hidden
    >
      <div className="hdiv-track">
        {Array.from({ length: COUNT }).map((_, i) => (
          <div key={i} className="hdiv-cell">
            <img src={GECKO_ICON} alt="" className="hdiv-icon" />
          </div>
        ))}
      </div>

      <style>{`

        /* ━━ Root band ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .hdiv-root {
          background: #ECFDF5;
          overflow: hidden;
        }

        /* ━━ Grid — exactly 20 equal columns across full width ━━━━━━━━━ */
        .hdiv-track {
          display: grid;
          grid-template-columns: repeat(${COUNT}, 1fr);
          width: 100%;
          padding: 0.65rem 0;
        }

        /* ━━ Each cell clips to its column ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
        .hdiv-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 0 1px;
        }

        /* ━━ Icon — fills cell height, cropped if too wide ━━━━━━━━━━━━ */
        .hdiv-icon {
          height: clamp(28px, 3.8vw, 54px);
          width: 100%;
          object-fit: contain;
          object-position: center;
          opacity: 0.42;
          display: block;
        }
      `}</style>
    </div>
  )
}
