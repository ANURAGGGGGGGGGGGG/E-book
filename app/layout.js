import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TargetCursor from "../components/TargetCursor";
import Navbar from "../components/Navbar";
import DockBar from "../components/DockBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "BookVerse",
  description: "Your digital library for novels, study materials, and premium e-books.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Global interactive cursor for buttons and links */}
        <TargetCursor targetSelector="button, a, .cursor-target" spinDuration={2} hideDefaultCursor={true} />
        {/* Global Navbar */}
        <Navbar />
        {children}
        {/* Global bottom Dock */}
        <DockBar />
      </body>
    </html>
  );
}
