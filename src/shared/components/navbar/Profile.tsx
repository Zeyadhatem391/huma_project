import Link from "next/link";
import { cookies } from "next/headers";
import ProfileDropdown from "./ProfileDropdown";

interface User {
  id: number;
  name: string;
  email: string;
  job_title: string | null;
  avatar_url: string | null;
  roles: string[];
}

export default async function Profile() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  const userCookie = cookieStore.get("user")?.value;

  let user: User | null = null;

  if (token && userCookie) {
    try {
      user = JSON.parse(userCookie) as User;
    } catch {
      user = null;
    }
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
      >
        Login
      </Link>
    );
  }

  return <ProfileDropdown user={user} />;
}