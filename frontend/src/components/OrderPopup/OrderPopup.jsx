import React from 'react';
import './OrderPopup.css';

export default function OrderPopup({ status, onClose, onRedirect }) {
  // If the modal isn't active, don't render it at all
  if (status === 'idle') return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        
        {/* STATE 1: PROCESSING */}
        {status === 'processing' && (
          <div className="modal-state animate-fade-in">
            <div className="spinner"></div>
            <h2>Processing Order...</h2>
            <p>Please do not refresh or close this page.</p>
          </div>
        )}

        {/* STATE 2: SUCCESS */}
        {status === 'success' && (
          <div className="modal-state animate-fade-in">
            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
            <h2>Order Successful!</h2>
            <p>Thank you! Your order has been placed successfully.</p>
            <button className="btn-home" onClick={onRedirect}>
              Return to Home
            </button>
          </div>
        )}

        {/* STATE 3: ERROR (Fallback) */}
        {status === 'error' && (
          <div className="modal-state animate-fade-in">
            <div className="error-cross">✕</div>
            <h2>Order Failed</h2>
            <p>Something went wrong. Please try again.</p>
            <button className="btn-close" onClick={onClose}>
              Close & Retry
            </button>
          </div>
        )}

      </div>
    </div>
  );
}