"use client";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "./ReactQueryProvider";
import { SessionProvider } from "next-auth/react"; // 👈 import SessionProvider

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// export const metadata: Metadata = {
//   title: "AffiliateLink Hub",
//   description:
//     "Manage and promote your affiliate links with AI-powered descriptions.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            {" "}
            {/* 👈 wrap with SessionProvider */}
            <ReactQueryProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow container mx-auto p-4 pt-20">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
            </ReactQueryProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
