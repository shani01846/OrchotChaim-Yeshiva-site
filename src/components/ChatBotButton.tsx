"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ChatPanel = dynamic(() => import('./ChatPanel'), { ssr: false });

export default function ChatBotButton() {
  const [open, setOpen] = useState(false);

  return (
    <div aria-live="polite">
      <button
        className="chatbot-button"
        aria-expanded={open}
        aria-controls="chatbot-panel"
        onClick={() => setOpen((s) => !s)}
      >
        <span className="chatbot-icon" aria-hidden>💬</span>
        <span className="sr-only">Open chat</span>
      </button>

      {open && (
        <div id="chatbot-panel" className="chatbot-panel" role="dialog" aria-label="Chat bot">
          <header className="chatbot-panel__header">
            <strong>Chat</strong>
            <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
          </header>
          <div className="chatbot-panel__body">
            <ChatPanel />
          </div>
        </div>
      )}
    </div>
  );
}
