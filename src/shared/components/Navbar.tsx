import Link from "next/link";
import Profile from "./navbar/Profile";
import Notifications from "./navbar/Notifications";
import SearchNavbar from "./navbar/SearchNavbar";
import Navigate from "./navbar/Navigate";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex h-20 w-full items-center justify-between gap-8 shadow bg-white px-14">
      <div className="flex gap-7 items-center">
        <Link
          href="/"
          className="shrink-0 text-xl font-semibold tracking-tight text-gray-900"
        >
          Collabspace
        </Link>
        <Navigate />
      </div>

      <div className="flex flex-1 items-center justify-end gap-1">
        <SearchNavbar />

        <div className="flex shrink-0 items-center gap-1">
          <Notifications />
          <Profile />
        </div>
      </div>
    </header>
  );
}
