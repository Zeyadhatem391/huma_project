import { ChangeEvent } from "react";
import { SquarePen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  name?: string;
  avatarUrl?: string;
  onAvatarChange?: (file: File) => void;
}

export default function ProfileHeader({
  name,
  avatarUrl,
  onAvatarChange,
}: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) onAvatarChange?.(file);
    e.target.value = "";
  }

  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0">
        <Avatar className="size-[92px]">
          <AvatarImage
            src={avatarUrl || undefined}
            alt={name || "User"}
            className="object-cover"
          />
          <AvatarFallback className="bg-blue-100 text-2xl font-bold text-blue-700">
            {name?.slice(0, 2).toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>

        <label className="absolute -right-1 bottom-0 flex size-7 cursor-pointer items-center justify-center rounded-full bg-blue-50 text-[#0057FF] transition hover:bg-blue-100 focus-within:ring-2 focus-within:ring-[#0057FF]">
          <SquarePen className="size-[18px]" />
          <input
            type="file"
            accept="image/*"
            aria-label="Change profile picture"
            onChange={handleChange}
            className="sr-only"
          />
        </label>
      </div>

      <h1 className="min-w-0 break-words text-2xl font-bold text-gray-950 sm:text-3xl">
        {name}
      </h1>
    </div>
  );
}
