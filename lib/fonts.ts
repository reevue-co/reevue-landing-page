import { Geist_Mono, Outfit } from "next/font/google";

export const sans = Outfit({
  variable: "--font-sans-family",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const fontClassName = `${sans.variable} ${geistMono.variable}`;
