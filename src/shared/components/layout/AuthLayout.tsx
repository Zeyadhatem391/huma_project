import { ReactNode } from "react";
import { ChevronDown, Laptop } from "lucide-react";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center lg:hidden">
        <div className="rounded-2xl border bg-white p-8 shadow-lg">
          <Laptop className="mx-auto mb-4 h-14 w-14 text-green-600" />

          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Desktop Only
          </h1>

          <p className="max-w-sm text-gray-600">
            This dashboard is currently optimized for desktop screens. Please
            open it on a laptop or desktop computer for the best experience.
          </p>
        </div>
      </div>

      <div className="hidden min-h-screen w-full flex-col bg-gray-100/40 p-8 lg:flex">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="block text-xl font-semibold tracking-tight text-gray-900"
          >
            Collabspace
          </Link>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            English
            <ChevronDown size={20} className="text-gray-500" />
          </button>
        </header>

        <main className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md rounded-2xl bg-white px-10 py-6 shadow-xl">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
