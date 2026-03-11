'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from '../app/landing.module.css';

interface Donation { id: string; name: string; qr: string; address: string; }

export default function DonateButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false); // for animation
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const donations: Donation[] = [
    { id: 'btc', name: 'Bitcoin', qr: '/btc-qr.webp', address: 'bc1q3a3ey9yym9ac87pq8tzrme7968cu2q7cytwth7' },
    { id: 'eth', name: 'Ethereum', qr: '/eth-qr.webp', address: '0x227C638C7A7BD5E61B5072cF11eaAfA389d6798a' },
    { id: 'matic', name: 'Polygon', qr: '/matic-qr.webp', address: '0x227C638C7A7BD5E61B5072cF11eaAfA389d6798a' },
  ];

  useEffect(() => { const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); }; document.addEventListener('keydown', handleEsc); return () => document.removeEventListener('keydown', handleEsc); }, []);

  const openModal = () => { setIsOpen(true); setTimeout(() => setVisible(true), 20); }; // small delay for animation
  const closeModal = () => { setVisible(false); setTimeout(() => setIsOpen(false), 220); }; // allow animation to finish

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => { if (e.target === modalRef.current) closeModal(); };
  const copyAddress = (address: string, id: string) => { navigator.clipboard.writeText(address).then(() => { setCopiedId(id); setTimeout(() => setCopiedId(null), 1400); }); };

  return (
    <>
    <button onClick={openModal}>♥ Support</button>

      {isOpen && (
        <div className={`modal-overlay ${visible ? 'open' : ''}`} ref={modalRef} onClick={handleOverlayClick}>
          <div className={`modal-content ${visible ? 'open' : ''}`}>
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <h2 className="modal-header">Keep Us Going!</h2>
            <p className="thanks-message">Thank you for considering a contribution. Your support helps us keep improving and growing.</p>
            <div className="donation-grid">
              {donations.map((donation) => (
                <div key={donation.id} className="donation-item">
                <div className="image-container">
                  <Image src={donation.qr} alt={`${donation.name} QR`} width={140} height={140} />
                  </div>
                  <div className="address-wrapper" onClick={() => copyAddress(donation.address, donation.id)}>
                    <span className="address-text">{donation.address}</span>
                    <span className={`tooltip ${copiedId === donation.id ? 'visible' : ''}`}>{copiedId === donation.id ? 'Copied!' : 'Copy'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .donate-btn{font-weight:600;font-size:1.125rem;background:transparent;border:none;cursor:pointer;color:#1a1a1a;transition:color 0.3s ease;padding:0;}.donate-btn:hover{color:#6366f1;}
        .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.15);display:flex;justify-content:center;align-items:center;z-index:9999;padding:20px;backdrop-filter:blur(5px);opacity:0;transition:opacity 0.2s ease;}
        .modal-overlay.open{opacity:1;}
        .modal-content{background:#fff;max-width:720px;width:100%;border-radius:16px;box-shadow:0 12px 36px rgba(0,0,0,0.12);padding:32px 36px;display:flex;flex-direction:column;gap:24px;position:relative;transform:scale(0.95);opacity:0;transition:transform 0.2s ease, opacity 0.2s ease;}
        .modal-content.open{transform:scale(1);opacity:1;}
        .close-btn{position:absolute;top:18px;right:18px;background:transparent;border:none;font-size:24px;cursor:pointer;color:#9ca3af;}.close-btn:hover{color:#6b7280;}
        .modal-header{font-weight:700;font-size:1.5rem;color:#111827;text-align:center;margin-bottom:0;}
        .thanks-message{font-size:0.875rem;color:#8c9096;text-align:center;max-width:600px;margin:0 auto 4px auto;}
        .donation-grid{display:flex;gap:24px;justify-content:space-between;flex-wrap:wrap;}
        .donation-item{flex:1 1 30%;background:#f9fafb;border-radius:12px;padding:24px 20px;box-shadow:0 4px 8px rgb(0 0 0 / 0.04);display:flex;flex-direction:column;align-items:center;gap:16px;cursor:pointer;}.donation-item:hover{box-shadow:0 6px 12px rgb(0 0 0 / 0.06);}
        .image-container{-webkit-mask-image: 
            linear-gradient(black, black),
            radial-gradient(circle at center, black 65%, transparent 100%);
            -webkit-mask-composite: destination-in;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-size: 100% 100%;
            
            mask-image: 
            linear-gradient(black, black), 
            radial-gradient(circle at center, black 65%, transparent 100%);
            mask-composite: intersect;
            mask-repeat: no-repeat;
            mask-size: 100% 100%;}
        .address-wrapper{position:relative;display:inline-block;cursor:pointer;}
        .address-text{display:inline-block;font-family:'Roboto Mono',monospace;font-size:0.875rem;color:#374151;background-color:#0000000c;white-space:pre-wrap;word-break:break-word;text-align:center;border-radius:7.5px;padding:0 4px;}.address-text:hover{background-color:#00000010;}
        .tooltip{position:absolute;bottom:125%;left:50%;transform:translateX(-50%);background:#111827;color:#fff;font-size:0.75rem;font-weight:500;padding:4px 8px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity 0.2s ease, transform 0.2s ease;z-index:10;}
        .address-wrapper:hover .tooltip{opacity:1;transform:translateX(-50%) translateY(-4px);}
        .tooltip.visible{opacity:1;transform:translateX(-50%) translateY(-4px);}
        @media (max-width:768px){.donation-grid{flex-direction:column;gap:24px;align-items:center;}.donation-item{width:100%;max-width:360px;}}
      `}</style>
    </>
  );
}