"use client";

import ChatList from "@/features/chats/components/ChatList";
import ChatWindow from "@/features/chats/components/ChatWindow";
import { conversations, initialMessages } from "@/features/chats/data/chat";
import { useState } from "react";

export default function ChatsPage() {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);

  const selectedChat = conversations.find((chat) => chat.id === activeChat);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: message.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "me" as const,
      },
    ]);

    setMessage("");
  };

  return (
    <div className="flex gap-6">
      <ChatList
        conversations={conversations}
        activeChat={activeChat}
        onSelectChat={setActiveChat}
      />

      <ChatWindow
        selectedChat={selectedChat}
        messages={messages}
        message={message}
        onMessageChange={setMessage}
        onSendMessage={sendMessage}
      />
    </div>
  );
}
