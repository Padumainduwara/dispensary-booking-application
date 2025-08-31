'use client'; // <-- Add this line to make it a Client Component

import { useState, useEffect } from 'react'; // <-- Import useState and useEffect
import { Geist } from "next/font/google";
import "./globals.css";
import { AnimatePresence } from 'framer-motion'; // <-- Import AnimatePresence
import Preloader from '@/components/Preloader'; // <-- Import the new Preloader
import PageTransition from '@/components/PageTransition'; // <-- Import the new PageTransition

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Metadata can be removed from here as client components don't support it directly.
// You can add it back to the page.tsx if needed.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading time for the preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <AnimatePresence mode="wait">
          {isLoading && <Preloader />}
        </AnimatePresence>
        
        {!isLoading && (
          <PageTransition>
            {children}
          </PageTransition>
        )}
      </body>
    </html>
  );
}