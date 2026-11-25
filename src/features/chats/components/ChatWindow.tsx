"use client";

import {
  MoreVertical,
  Phone,
  Video,
  Send,
  Paperclip,
  Smile,
  CheckCheck,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Conversation {
  id: number;
  name: string;
  online: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  sender: "me" | "other";
}

interface Props {
  selectedChat: Conversation | undefined;
  messages: Message[];
  message: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
}

export default function ChatWindow({
  selectedChat,
  messages,
  message,
  onMessageChange,
  onSendMessage,
}: Props) {
  if (!selectedChat) return null;

  return (
    <section className="flex min-w-0 flex-1 flex-col rounded-2xl">

      <div className="flex items-center justify-between shadow p-4 bg-white rounded-2xl">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-blue-100 font-semibold text-blue-700">
              {selectedChat.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div>
            <h3 className="text-sm font-semibold">{selectedChat.name}</h3>

            <p className="text-xs text-green-600">
              {selectedChat.online ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 cursor-pointer rounded-full text-gray-500 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
          >
            <Phone className="h-6! w-6!" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 cursor-pointer rounded-full text-gray-500 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
          >
            <Video className="h-6! w-6!" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 cursor-pointer rounded-full text-gray-500 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 hover:scale-105"
          >
            <MoreVertical className="h-6! w-6!" />
          </Button>
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto bg-gray-50/50 p-5">
        <div className="text-center">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] text-gray-500">
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.sender === "me"
                  ? "rounded-br-sm bg-blue-600 text-white"
                  : "rounded-bl-sm shadow bg-white text-gray-800"
              }`}
            >
              <p className="text-sm leading-6">{msg.text}</p>

              <div
                className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${
                  msg.sender === "me" ? "text-blue-100" : "text-gray-400"
                }`}
              >
                {msg.time}

                {msg.sender === "me" && <CheckCheck size={13} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") onSendMessage();
            }}
            className="h-12 rounded-xl bg-white pr-13 border border-gray-200 focus-visible:ring-0"
          />

          <button className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-gray-400">
            <Smile size={19} />
          </button>
          <button className="absolute right-12 cursor-pointer top-1/2 -translate-y-1/2 text-gray-400">
            <Paperclip size={19} />
          </button>
        </div>

        <Button
          size="icon"
          className="h-11 w-12 text-white cursor-pointer shrink-0 rounded-lg bg-blue-700"
          onClick={onSendMessage}
        >
          <Send size={18} />
        </Button>
      </div>
    </section>
  );
}
