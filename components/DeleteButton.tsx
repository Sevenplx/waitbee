'use client';

import { useState } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import { Button } from './Button';
import styles from './DeleteButton.module.css';

interface DeleteButtonProps {
  onConfirm: () => Promise<void>;
  title: string;
  description: string;
  buttonText?: string;
  iconOnly?: boolean;
}

export function DeleteButton({ onConfirm, title, description, buttonText = 'Delete', iconOnly = false }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to delete:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {iconOnly ? (
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(true); }}
          className={styles.iconBtn}
          title={buttonText}
        >
          <Trash2 size={18} />
        </button>
      ) : (
        <Button
          variant="danger"
          size="sm"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(true); }}
          icon={<Trash2 size={16} />}
        >
          {buttonText}
        </Button>
      )}

      {isOpen && (
        <div className={styles.overlay} onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(false); }}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <div className={styles.modalTitleGroup}>
                  <div className={styles.iconWrapper}>
                    <AlertTriangle size={24} />
                  </div>
                  <h3 className={styles.modalTitle}>{title}</h3>
                </div>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(false); }}
                  className={styles.closeBtn}
                >
                  <X size={20} />
                </button>
              </div>
              
              <p className={styles.modalDesc}>
                {description}
              </p>
              
              <div className={styles.modalActions}>
                <Button
                  variant="outline"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(false); }}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(); }}
                  isLoading={isDeleting}
                >
                  Yes, delete it
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
