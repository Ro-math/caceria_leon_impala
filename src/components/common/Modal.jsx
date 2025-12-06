import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import './Common.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ margin: 0, color: 'var(--color-primary)' }}>{title}</h2>
                    <button onClick={onClose} style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>
                        <IoMdClose />
                    </button>
                </div>
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
