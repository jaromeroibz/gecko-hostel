import { useEffect, useState } from 'react'

import type { BookingRoom } from '../../data/bookingRooms'

type Props = {
  room: BookingRoom
  arrivalYmd: string
  departureYmd: string
  adults: number
}

export function LodgifyWidget({ room, arrivalYmd, departureYmd, adults }: Props) {
  const [iframeHeight, setIframeHeight] = useState(420)
  const [widgetLoaded, setWidgetLoaded] = useState(false)

  // Always pass the real guest count so Lodgify prices correctly for every
  // room type — dorms (per bed) and private rooms (checks capacity/pricing).
  const widgetSrc =
    `/booking-widget.html?rentalId=${room.rentalId}` +
    `&arrival=${arrivalYmd}&departure=${departureYmd}&adults=${adults}`

  // Reset loaded flag whenever the URL changes (new dates or room)
  useEffect(() => { setWidgetLoaded(false) }, [widgetSrc])

  // Listen for postMessage events from the iframe
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type === 'ldg-widget-height' && typeof e.data.height === 'number') {
        setIframeHeight(e.data.height + 16)
      }
      if (e.data?.type === 'ldg-widget-ready') {
        setWidgetLoaded(true)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <>
      <div className="ldgw-card">
        {/* Spinner — shown while iframe loads */}
        {!widgetLoaded && (
          <div className="ldgw-spinner-wrap">
            <div className="ldgw-spinner" />
            <p className="ldgw-spinner-text font-label">Checking availability…</p>
          </div>
        )}

        {/* iframe — always in DOM so it loads in the background */}
        <iframe
          key={widgetSrc}
          src={widgetSrc}
          title={`Book ${room.name}`}
          style={{
            width: '100%',
            height: widgetLoaded ? iframeHeight : 0,
            border: 'none',
            display: 'block',
            opacity: widgetLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>

      <style>{`
        .ldgw-card {
          background: #ffffff;
          border: 1px solid rgba(6, 78, 59, 0.1);
          border-radius: 1.25rem;
          padding: 1.25rem;
          box-shadow:
            0 1px 0 rgba(6, 78, 59, 0.03),
            0 8px 32px -8px rgba(6, 78, 59, 0.1);
        }

        .ldgw-spinner-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          padding: 3rem 0;
        }

        .ldgw-spinner {
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%;
          border: 2px solid rgba(6, 78, 59, 0.15);
          border-top-color: #064E3B;
          animation: ldgw-spin 0.7s linear infinite;
        }

        @keyframes ldgw-spin {
          to { transform: rotate(360deg); }
        }

        .ldgw-spinner-text {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(6, 78, 59, 0.4);
          margin: 0;
        }
      `}</style>
    </>
  )
}
