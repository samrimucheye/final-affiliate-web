// import type {Metadata} from 'next';
// import { Inter as FontSans } from "next/font/google" // Using Inter as a common sans-serif font
// import './globals.css';
// import Navbar from '@/components/Navbar'; // Adjusted path assuming Navbar is in components
// import Footer from '@/components/Footer'; // Adjusted path assuming Footer is in components
// import {ThemeProvider} from "@/components/ThemeProvider";
// import { Toaster } from "@/components/ui/toaster";
// // QueryProvider removed as Firebase and react-query for Firebase are removed
// import { cn } from "@/lib/utils";

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })

// export const metadata: Metadata = {
//   title: 'AffiliateLink Hub',
//   description: 'Manage and promote your affiliate links with AI-powered descriptions.',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head />
//       <body
//         className={cn(
//           "min-h-screen bg-background font-sans antialiased",
//           fontSans.variable
//         )}
//       >
//         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//           <div className="flex flex-col min-h-screen">
//             <Navbar />
//             <main className="flex-grow container mx-auto p-4 pt-20">
//               {children}
//             </main>
//             <Footer />
//           </div>
//           <Toaster />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "./ReactQueryProvider"; // 👈 import the wrapper

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AffiliateLink Hub",
  description:
    "Manage and promote your affiliate links with AI-powered descriptions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ReactQueryProvider>
            {" "}
            {/* ✅ Wrap children here */}
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow container mx-auto p-4 pt-20">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
