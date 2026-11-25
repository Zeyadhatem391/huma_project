"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Conversation {
  id: number;
  name: string;
  message: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Props {
  conversations: Conversation[];
  activeChat: number;
  onSelectChat: (id: number) => void;
}

export default function ChatList({
  conversations,
  activeChat,
  onSelectChat,
}: Props) {
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredConversations = conversations.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <aside className="flex w-full max-w-[350px] shrink-0 flex-col rounded-2xl bg-white px-4 pt-6">
      <div className="mb-5 space-y-5 border-b border-gray-100 pb-5">
        <div className="flex items-center justify-between gap-2">
          {isSearchOpen ? (
            <Input
              autoFocus
              placeholder="Search conversations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 flex-1 rounded-xl bg-gray-50 focus-visible:ring-0"
            />
          ) : (
            <h2 className="text-xl font-bold text-gray-900">Chats</h2>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 rounded-full text-gray-500"
            onClick={() => {
              setIsSearchOpen((prev) => !prev);
              setSearch("");
            }}
          >
            <Search size={21} />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <button className="rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white">
            All
          </button>

          <button className="rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600">
            Project Chats
          </button>

          <button className="rounded-full bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600">
            Inbox
          </button>
        </div>
      </div>

      <div className="flex-1">
        {filteredConversations.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl p-4 text-left transition-colors hover:bg-gray-100 ${
              activeChat === chat.id ? "bg-blue-50" : ""
            }`}
          >
            <div className="relative">
              <Avatar className="h-11 w-11">
                <AvatarFallback className="bg-blue-100 font-semibold text-blue-700">
                  {chat.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {chat.online && (
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center justify-between gap-2">
                <h3 className="truncate text-sm font-semibold">{chat.name}</h3>

                <span className="shrink-0 text-[10px] text-gray-400">
                  {chat.time}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs text-gray-500">{chat.message}</p>

                {chat.unread > 0 && (
                  <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] text-white">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
