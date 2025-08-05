"use client";

import { ThemeProvider } from "@/context/ThemeProvider";

export function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
} 