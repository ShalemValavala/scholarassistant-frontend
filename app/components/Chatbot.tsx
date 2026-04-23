"use client";
import { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI assistant 👋", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

const sendMessage = async () => {
  if (!input) return;

  const newMessages = [...messages, { text: input, sender: "user" }];
  setMessages(newMessages);

  const res = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: input }),
  });

  const data = await res.json();

  setMessages([
    ...newMessages,
    { text: data.reply, sender: "bot" },
  ]);

  setInput("");
};

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-xl rounded-xl">
      <div className="bg-blue-600 text-white p-3 rounded-t-xl">
        ScholarAssistant AI
      </div>

      <div className="p-3 h-64 overflow-y-auto">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.sender === "user" ? "text-right" : ""}`}>
            <span className="bg-gray-200 px-3 py-1 rounded-lg inline-block">
              {m.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex p-2 border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-2"
        />
        <button onClick={sendMessage}
          className="bg-blue-600 text-white px-3 ml-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
}