import { useEffect, useState } from "react";
import AgoraRTM from "agora-rtm-sdk";

const APP_ID = "01a12c7e648d4404892b63c276a4c1e4";
const CHANNEL_NAME = "wdj";

// ✅ Ubah UID dan Token sesuai yang kamu generate dari console
const USER_ID = "user1"; // ubah ke "user2" di browser lain
const TEMP_TOKEN = "007eJxTYOBevjLzz5L982b6qezceEbtRMaH6TEKp7+lqAnc2FdY6LhegcHAMNHQKNk81czEIsXExMDEwtIoycw42cjcLNEk2TDV5OQDo4yGQEaG3XOnsDIysDIwAiGIr8KQZmycmmxqYKBrbGliqGtomGaga2lpnqSbYpxsZm6YbJCWYmoJABTjKJ8="; // ← Ganti dengan token asli dari console

const client = AgoraRTM.createInstance(APP_ID);

export default function ChatWindow({ onClose }) {
  const [text, setText] = useState('');
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [connectionState, setConnectionState] = useState('connecting');

  useEffect(() => {
    const connect = async () => {
      try {
        console.log("Logging in with UID:", USER_ID);
        await client.login({ uid: USER_ID, token: TEMP_TOKEN });

        const ch = client.createChannel(CHANNEL_NAME);
        await ch.join();
        console.log("Joined channel:", CHANNEL_NAME);

        ch.on('ChannelMessage', (message, memberId) => {
          console.log("Received from", memberId, ":", message.text);
          setMessages(current => [...current, { uid: memberId, text: message.text }]);
        });

        client.on('ConnectionStateChanged', (newState, reason) => {
          console.log("Connection state changed:", newState, reason);
          setConnectionState(newState);
        });

        setChannel(ch);
        return ch;
      } catch (err) {
        console.error("Agora RTM connection error:", err);
      }
    };

    const connection = connect();

    return () => {
      const cleanup = async () => {
        const ch = await connection;
        if (ch) await ch.leave();
        await client.logout();
      };
      cleanup();
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() || !channel) return;

    try {
      await channel.sendMessage({ text });
      setMessages(current => [...current, { uid: USER_ID, text }]);
      setText('');
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-2xl border border-amber-300 z-50 flex flex-col">
      <div className="bg-amber-200 px-4 py-2 flex justify-between items-center rounded-t-2xl">
        <h2 className="font-bold text-[#4a2b1b]">Live Chat</h2>
        <button onClick={onClose} className="text-sm text-red-600 hover:underline">Close</button>
      </div>
      <div className="text-xs px-4 pt-1 text-gray-500 italic">Status: {connectionState}</div>
      <div className="flex-1 p-4 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-sm p-2 rounded-lg ${msg.uid === USER_ID ? 'bg-amber-100 self-end text-right' : 'bg-gray-100 self-start text-left'}`}>
            <strong>{msg.uid === USER_ID ? 'You' : msg.uid}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex border-t p-2">
        <input
          className="flex-1 border border-amber-300 rounded-l-md px-3 py-1 text-sm focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="bg-[#4a2b1b] text-white px-4 rounded-r-md text-sm">Send</button>
      </form>
    </div>
  );
}
