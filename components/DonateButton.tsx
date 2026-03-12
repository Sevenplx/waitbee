'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Donation {
  id: string;
  name: string;
  qr: string;
  address: string;
}

export default function DonateButton({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const donations: Donation[] = [
    { id: 'btc', name: 'Bitcoin', qr: '/btc-qr.webp', address: 'bc1q3a3ey9yym9ac87pq8tzrme7968cu2q7cytwth7' },
    { id: 'eth', name: 'Ethereum', qr: '/eth-qr.webp', address: '0x227C638C7A7BD5E61B5072cF11eaAfA389d6798a' },
    { id: 'matic', name: 'Polygon', qr: '/matic-qr.webp', address: '0x227C638C7A7BD5E61B5072cF11eaAfA389d6798a' },
  ];

  // Function to copy address
  const copyAddress = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1400);
  };

  // Handle modal close with pop-out animation
  const handleClose = () => {
    const modalContent = modalRef.current?.querySelector('.modal-content');
    if (modalContent) {
      modalContent.classList.add('pop-out');
      setTimeout(() => setIsOpen(false), 250); // match animation duration
    } else {
      setIsOpen(false);
    }
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Close modal when clicking overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) handleClose();
  };

  return (
    <>
      <button className={`donate-btn ${className ?? ''}`} onClick={() => setIsOpen(true)}>
        ♥ Support
      </button>

      {isOpen && (
        <div className="modal-overlay" ref={modalRef} onClick={handleOverlayClick}>
          <div className="modal-content">
            <button className="close-btn" onClick={handleClose}>&times;</button>
            <h2 className="modal-header">Keep Us Going!</h2>
            <p className="thanks-message">
              Thank you for considering a contribution. Your support helps us keep improving and growing.
            </p>

            <div className="donation-grid">
              {donations.map((donation) => (
                <div key={donation.id} className="donation-item">
                  <Image src={donation.qr} alt={`${donation.name} QR`} width={140} height={140} />
                  <span
                    className="address-text"
                    onClick={() => copyAddress(donation.address, donation.id)}
                    data-tooltip={copiedId === donation.id ? 'Copied!' : 'Copy'}
                  >
                    {donation.address}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Navbar-style button */
        .donate-btn {
          text-decoration: none;
          color: #666;
          font-size: 0.95rem;
          font-weight: 500;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
          padding: 0;
        }
        .donate-btn:hover { color: #d45656ff; }

        /* Modal overlay */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.15);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          padding: 20px;
          backdrop-filter: blur(5px);
          animation: fadeIn 0.25s ease forwards;
        }

        /* Modal content pop-in animation */
        .modal-content {
          background: #fff;
          max-width: 720px;
          width: 100%;
          border-radius: 16px;
          padding: 32px 36px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          position: relative;
          box-shadow: 0 12px 36px rgba(0,0,0,0.12);
          transform: scale(0.95);
          opacity: 0;
          animation: popIn 0.25s ease forwards;
        }

        /* Keyframes */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes popOut { from { opacity: 1; transform: scale(1); } to { opacity: 0; transform: scale(0.95); } }

        .pop-out { animation: popOut 0.25s forwards; }

        /* Close button */
        .close-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          background: transparent;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #9ca3af;
          margin: 0 10px;
        }
        .close-btn:hover { color: #6b7280; }

        /* Modal text */
        .modal-header { font-weight: 700; font-size: 1.5rem; color: #111827; text-align: center; margin-bottom: 0; }
        .thanks-message { font-size: 0.875rem; color: #8c9096; text-align: center; max-width: 600px; margin: 0 auto 4px auto; }

        /* Donation grid */
        .donation-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          justify-content: space-between;
        }
        .donation-item {
          flex: 1 1 30%;
          background: #f9fafb;
          border-radius: 12px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          box-shadow: 0 4px 8px rgb(0 0 0 / 0.04);
          transition: box-shadow 0.2s ease;
        }
        .donation-item:hover { box-shadow: 0 6px 12px rgb(0 0 0 / 0.06); }

        /* Address pill */
        .address-text {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.875rem;
          color: #374151;
          text-align: center;
          word-break: break-all;
          cursor: pointer;
          background: rgba(0,0,0,0.05);
          padding: 2px 6px;
          border-radius: 4px;
          position: relative;
        }
        .address-text:hover { background: rgba(0,0,0,0.1); }

        /* Tooltip */
        .address-text::after {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%);
          background: #111827;
          color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease;
        }
        .address-text:hover::after { opacity: 1; }

        /* Responsive */
        @media (max-width: 768px) {
          .donation-grid { flex-direction: column; align-items: center; }
          .donation-item { width: 100%; max-width: 360px; }
        }
      `}</style>
    </>
  );
}