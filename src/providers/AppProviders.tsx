"use client";
import { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import { NuqsAdapter } from "nuqs/adapters/next";

interface Props {
  children: ReactNode;
}

export default function AppProviders({ children }: Props) {
  return (
    <>
      <QueryProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </QueryProvider>
    </>
  );
}
