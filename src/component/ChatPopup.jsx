import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatWindow from './ChatWindow';

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 bg-[#f2d9b1] border border-[#4a2b1b] rounded-2xl shadow-2xl p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-[#4a2b1b] font-bold text-lg">Need Help?</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#4a2b1b] hover:text-red-500"
            >
              <X />
            </button>
          </div>

          <div className="bg-white rounded-lg h-64 overflow-y-auto">
            <ChatWindow onClose={() => setIsOpen(false)} />
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#4a2b1b] text-[#f2d9b1] p-3 rounded-full shadow-lg hover:bg-[#EB7C7B] transition-all"
          aria-label="Open Chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ChatPopup;
