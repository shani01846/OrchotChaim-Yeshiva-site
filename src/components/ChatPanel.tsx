"use client";
import React, { useState, useRef, useEffect } from 'react';

export default function ChatPanel({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<{ id: number; author: 'user' | 'bot'; text: string }[]>([
    { id: 1, author: 'bot', text: 'הצ׳אט כרגע בפיתוח — החזר אוטומטי' },
  ]);
  const [input, setInput] = useState('');
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }); }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const nextId = messages.length ? messages[messages.length - 1].id + 1 : 1;
    setMessages((m) => [...m, { id: nextId, author: 'user', text: input.trim() }]);
    setInput('');

    // Auto-reply placeholder
    setTimeout(() => {
      const botId = nextId + 1;
      setMessages((m) => [...m, { id: botId, author: 'bot', text: 'תודה — הבוט בפיתוח, נחזור אליך בקרוב.' }]);
    }, 700);
  };

  return (
    <div className="chat-panel" role="region" aria-label="Chat panel">
      <div className="chat-panel__messages" ref={listRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-msg ${msg.author === 'user' ? 'is-user' : 'is-bot'}`}>
            <div className="chat-msg__bubble">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="chat-panel__input">
        <div className="chat-input-wrapper">
          <label htmlFor="chat-input" className="sr-only">Type a message</label>
          <div className="chat-input-decor" aria-hidden>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 5.58 2 10C2 12.39 3.17 14.47 5 15.8V22L9.1 19.4C9.73 19.17 10.38 19 11 19C16.52 19 21 15.42 21 11C21 6.58 16.52 3 11 3Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <input
            id="chat-input"
            className="chat-input"
            placeholder="כתוב הודעה..."
            aria-label="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          />
          <button className="chat-send" onClick={send} aria-label="Send message">
            <span className="chat-send__icon">➤</span>
            <span className="chat-send__pulse" aria-hidden></span>
          </button>
        </div>
      </div>
    </div>
  );
}
