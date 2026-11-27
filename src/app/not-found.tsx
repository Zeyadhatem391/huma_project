"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  function goBack() {
    if (window.history.length > 1) router.back();
    else router.push("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#F7F8FA] px-4 py-8">
      <Link
        href="/"
        className="self-start text-xl font-medium text-gray-900 sm:px-8"
      >
        Collabspace
      </Link>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="relative">
          <p className="select-none text-[120px] font-extrabold leading-none tracking-tight text-blue-100 sm:text-[200px]">
            404
          </p>

          <div className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0057FF] shadow-lg sm:size-24">
            <SearchX className="size-9 sm:size-11" />
          </div>
        </div>

        <h1 className="mt-6 text-2xl font-bold text-gray-950 sm:text-3xl">
          Page not found
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-base">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            className="h-11 rounded-full border-slate-300 bg-white font-semibold text-slate-700 sm:flex-1"
          >
            <ArrowLeft className="size-4" />
            Go back
          </Button>

          <Button
            asChild
            className="h-11 rounded-full bg-[#0057FF] font-semibold text-white hover:bg-[#004BDB] sm:flex-1"
          >
            <Link href="/">
              <Home className="size-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
