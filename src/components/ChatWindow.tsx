import React, { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import { startSession, getSessionHistory, clearSession } from "../api/session";
import { sendMessage } from "../api/chat";
import { type Message } from "../types";
import "../styles/chat.scss";

export default function ChatWindow() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Initialize session
  useEffect(() => {
    async function init() {
      let existingSession = localStorage.getItem("sessionId");

      if (!existingSession) {
        const { sessionId } = await startSession();
        localStorage.setItem("sessionId", sessionId);
        setSessionId(sessionId);
        setMessages([]);
      } else {
        setSessionId(existingSession);
        const history = await getSessionHistory(existingSession);
        setMessages(history.messages || []);
      }
    }
    init();
  }, []);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !sessionId) return;

    const query = input;
    setInput(""); // ✅ Clear input immediately

    const userMsg: Message = { role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const { answer } = await sendMessage(sessionId, query);
      const botMsg: Message = { role: "bot", content: answer };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const botMsg: Message = { role: "bot", content: "⚠️ Error: could not fetch response." };
      setMessages((prev) => [...prev, botMsg]);
    }
  }

  async function handleReset() {
    if (sessionId) {
      await clearSession(sessionId);
      localStorage.removeItem("sessionId");
    }
    const { sessionId: newId } = await startSession();
    localStorage.setItem("sessionId", newId);
    setSessionId(newId);
    setMessages([]);
  }

  return (
    <div className="chat-window animate-fadeIn">
      <div className="chat-header">
        <h2>📰 News RAG Chatbot</h2>
        <button onClick={handleReset}>Reset</button>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
      </div>

      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about the news..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
