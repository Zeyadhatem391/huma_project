import { ReactNode } from "react";
import { Laptop } from "lucide-react";
import Navbar from "../Navbar";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center lg:hidden">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
          <Laptop className="mx-auto mb-4 h-14 w-14 text-blue-600" />

          <h1 className="mb-2 text-2xl font-bold text-gray-900">
            Desktop Only
          </h1>

          <p className="max-w-sm text-sm leading-6 text-gray-600">
            This dashboard is currently optimized for desktop screens. Please
            open it on a laptop or desktop computer for the best experience.
          </p>
        </div>
      </div>

      <div className="hidden min-h-screen w-full flex-col bg-gray-200/40 lg:flex">
        <Navbar />
        <main className="w-full flex-1 px-14 py-10">{children}</main>
      </div>
    </>
  );
}
