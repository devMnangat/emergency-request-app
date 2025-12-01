"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50 bg-linear-to-r from-red-500 to-red-700 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between">
        
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0 text-center sm:text-left">
          Emergency Request App
        </h1>

        {/* Right side */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-white/90 text-center sm:text-right">
            Report emergencies quickly and safely
          </p>

          {/* Admin link */}
          <Link
            href="/admin"
            className="bg-white text-red-600 font-semibold px-4 py-1.5 rounded-md shadow hover:bg-gray-100 transition hidden sm:block"
          >
            Admin Dashboard
          </Link>
        </div>

      </div>
    </header>
  );
}

