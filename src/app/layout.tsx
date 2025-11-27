import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="grow">{children}
            
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
