"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Shuffle from "./Shuffle";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-target" aria-label="Go to Home">
            <span className="text-2xl sm:text-3xl" aria-hidden="true">📚</span>
            <div className="scale-90 origin-left sm:scale-100">
              <Shuffle
                text="E-Book Library"
                tag="span"
                className="text-gray-900"
                style={{ fontFamily: 'inherit', fontSize: '1.5rem', textTransform: 'none' }}
                shuffleDirection="right"
                duration={0.35}
                animationMode="evenodd"
                stagger={0.03}
                threshold={0.1}
                triggerOnce={true}
                respectReducedMotion={true}
              />
            </div>
          </Link>
          {isHome && (
            <p className="text-gray-600 hidden md:block text-sm">Discover millions of books with Google Books</p>
          )}
        </div>
      </div>
    </header>
  );
}