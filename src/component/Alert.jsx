import React from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-[10px] bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
        <div className="text-center">
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#4A2B1B] text-white rounded-full hover:bg-[#2a1b0b] transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;