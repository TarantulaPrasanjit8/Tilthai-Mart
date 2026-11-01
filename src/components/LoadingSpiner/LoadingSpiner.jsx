import React from 'react';
import './LoadingSpiner.css';

const LoadingSpinner = ({ size = 'medium', color = '#3498db' }) => {
  // Map size keywords to pixel dimensions
  const sizeMap = {
    small: '24px',
    medium: '48px',
    large: '72px',
  };

  const spinnerSize = sizeMap[size] || sizeMap.medium;

  return (
    <div className="spinner-container" role="status" aria-label="Loading">
      <div 
        className="loading-spinner" 
        style={{ 
          width: spinnerSize, 
          height: spinnerSize,
          borderTopColor: color 
        }}
      />
    </div>
  );
};

export default LoadingSpinner;