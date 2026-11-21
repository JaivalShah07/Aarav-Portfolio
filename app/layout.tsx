import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const editorialSerif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B0D0E",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Aarav — Creative Developer / MIDNIGHT BUILD",
  description: "Personal developer studio exploring useful software, thoughtful interfaces, and reliable systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${editorialSerif.variable} h-full dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased selection:bg-accent-terminal/20 selection:text-accent-terminal">
        {children}
      </body>
    </html>
  );
}
