"use client";
import { ReactNode } from "react";
import QueryProvider from "./QueryProvider";

interface Props {
  children: ReactNode;
}

export default function AppProviders({ children }: Props) {
  return (
    <>
      <QueryProvider>{children}</QueryProvider>
    </>
  );
}
