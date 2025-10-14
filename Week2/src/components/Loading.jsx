import React from 'react';

const Loading = ({ text = 'Loading...', fullScreen = false, absolute = false }) => {
  const containerClass = absolute
    ? 'absolute inset-0 flex items-center justify-center'
    : fullScreen 
    ? 'flex items-center justify-center min-h-screen'
    : 'flex justify-center items-center py-8';

  return (
    <div className={containerClass}>
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
        {text && <p className="text-gray-600">{text}</p>}
      </div>
    </div>
  );
};

export default Loading;
