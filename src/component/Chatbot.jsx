import React, { useState, useRef, useEffect } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Welcome to Creepy Donut! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    try {
      const response = await fetch('https://localhost:7002/api/Chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await response.json();
      setMessages((msgs) => [...msgs, { from: 'bot', text: data.reply }]);
    } catch {
      setMessages((msgs) => [...msgs, { from: 'bot', text: "Sorry, something went wrong." }]);
    }
  };

  return (
    <div>
      {/* Floating Button */}
      {!open && (
        <button
          className="fixed bottom-6 right-6 bg-[#6d4c2b] text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center text-3xl z-50"
          onClick={() => setOpen(true)}
          aria-label="Open chat"
        >
          💬
        </button>
      )}

      {/* Chat Widget */}
      {open && (
        <div className="fixed bottom-6 right-6 w-80 max-w-full bg-white rounded-xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between bg-[#6d4c2b] text-white px-4 py-3 rounded-t-xl">
            <div>
              <div className="font-bold">Creepy Donut Assistant</div>
              <div className="text-xs opacity-80">Ask me anything about donuts!</div>
            </div>
            <button
              className="text-xl font-bold hover:text-amber-300"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-amber-50" style={{ minHeight: 200, maxHeight: 320 }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-[75%] ${
                    msg.from === 'user'
                      ? 'bg-[#6d4c2b] text-white'
                      : 'bg-[#e6d5c5] text-[#4a2b1b]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Input */}
          <form onSubmit={handleSend} className="flex border-t border-amber-200">
            <input
              className="flex-1 px-3 py-2 rounded-bl-xl focus:outline-none"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#6d4c2b] text-white rounded-br-xl hover:bg-[#4a2b1b] transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
