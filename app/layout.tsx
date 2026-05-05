import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";

import { LenisProvider } from "@/components/layout/lenis-provider";

import "./globals.css";
import "lenis/dist/lenis.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nebula Studios",
  description: "Advanced Agentic Coding & AI-Driven Software Development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${syne.variable} ${inter.variable} min-h-screen bg-background font-sans text-foreground antialiased`}>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
