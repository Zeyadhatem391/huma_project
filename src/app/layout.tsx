import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import AppProviders from "@/providers/AppProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CollabSpace | Team Collaboration Platform",
    template: "%s | CollabSpace",
  },
  description:
    "CollabSpace is an all-in-one team collaboration platform to manage projects, organize tasks, communicate with your team, schedule meetings, and track progress.",
  applicationName: "CollabSpace",
  keywords: [
    "CollabSpace",
    "Project Management",
    "Team Collaboration",
    "Task Management",
    "Team Communication",
    "Project Tracking",
    "Team Workspace",
  ],
  authors: [{ name: "CollabSpace Team" }],
  openGraph: {
    title: "CollabSpace | Team Collaboration Platform",
    description:
      "Manage projects, organize tasks, communicate with your team, and track progress — all in one workspace.",
    siteName: "CollabSpace",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppProviders>
          {children}
          <Toaster position="top-center" richColors />
        </AppProviders>
      </body>
    </html>
  );
}
