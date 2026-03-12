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

  const copyAddress = (address: string, id: string) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1400);
  };

  const handleClose = () => {
    const modalContent = modalRef.current?.querySelector('.modal-content');
    if (modalContent) {
      modalContent.classList.add('pop-out');
      setTimeout(() => setIsOpen(false), 250);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && handleClose();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

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
                  <div className="address-wrapper">
                    <span
                      className="address-text"
                      onClick={() => copyAddress(donation.address, donation.id)}
                    >
                      {donation.address}
                    </span>
                    <span className="tooltip">{copiedId === donation.id ? 'Copied!' : 'Copy'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
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
.donate-btn:hover {
  color: #d45656ff;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 20px;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.25s ease forwards;
}

.modal-content {
  background: #ffffff;
  max-width: 720px;
  width: 720px;
  border-radius: 16px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
  transform: scale(0.95);
  opacity: 0;
  animation: popIn 0.25s ease forwards;
  overflow-x: hidden; /* prevent horizontal scroll */
  overflow-y: auto;   /* vertical scroll if content is tall */
  box-sizing: border-box;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes popOut {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
}

.pop-out {
  animation: popOut 0.25s forwards;
}

.close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #9ca3af;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.close-btn:hover { color: #6b7280; }

.modal-header {
  font-weight: 700;
  font-size: 1.5rem;
  color: #111827;
  text-align: center;
  margin: 0;
}

.thanks-message {
  font-size: 0.875rem;
  color: #8c9096;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.donation-grid {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  overflow-x: hidden;
  flex-wrap: nowrap;
}

.donation-item {
  flex: 0 0 200px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  transition: all 0.2s ease;
  min-height: auto;
}

.donation-item:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.image-container {
  width: 140px;
  height: 140px;
  position: relative;
}

.address-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}

.address-text {
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 0.75rem;
  color: #374151;
  background: #f3f4f6;
  padding: 6px 8px;
  border-radius: 6px;
  text-align: center;
  user-select: all;
  cursor: pointer;
  line-height: 1.3;
  max-width: 180px;
  transition: background 0.2s ease;
  white-space: normal;       /* allow wrapping */
  overflow-wrap: anywhere;   /* break long words if needed */
  word-break: break-word;
}

.address-text:hover {
  background: #e5e7eb;
}

/* Tooltip for copy feedback */
.tooltip {
  position: absolute;
  bottom: 130%;
  left: 50%;
  transform: translateX(-50%);
  background: #1f2937;
  color: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
  z-index: 10;
}

.address-wrapper:hover .tooltip {
  opacity: 1;
}

/* Responsive - vertical stacking on mobile */
@media (max-width: 768px) {
  .modal-overlay {
    align-items: flex-start; /* allow scrolling instead of center overlay */
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .modal-content {
    width: 90vw;
    max-width: 360px; /* smaller max-width for vertical scroll */
    max-height: 90vh; /* prevent overlay overflow */
    padding: 24px 20px;
    overflow-y: auto;
    margin: 0 auto; /* center horizontally */
  }

  .donation-grid {
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  .donation-item {
    flex: none;
    width: 100%;
    max-width: 340px;
    padding: 20px 18px;
  }

  .address-text {
    max-width: 100%;
  }
}
      `}</style>
    </>
  );
}