import type { Metadata } from "next";

import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { developerName } from "@/data/site";

import "./globals.css";

export const metadata: Metadata = {
  title: `${developerName} | Full-Stack Portfolio`,
  description:
    "A refined full-stack portfolio built with Next.js, expressive motion, and editorial-inspired layouts.",
  metadataBase: new URL("https://example.com")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background font-body text-foreground antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
