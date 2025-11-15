import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

function ModalPortal({ children, onClose }) {
  const portalRoot = document.getElementById('portal-root');
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.keyCode === 27) onClose(); // ESC key
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    portalRoot
  );
}

export default ModalPortal;