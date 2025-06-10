"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ModeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-background border-b shadow-sm fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto p-4 flex items-center justify-between bg-red-400">
        <Link href="/" className="text-xl font-bold">
          AffiliateLink
        </Link>

        {/* Hamburger menu for small devices */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger>
              <Menu className="h-6 w-6 cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetTitle>Navigation</SheetTitle>
              <div className="flex flex-col space-y-4 p-4">
                <Link
                  href="/"
                  className="hover:text-primary"
                  onClick={handleMenuClose}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="hover:text-primary"
                  onClick={handleMenuClose}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-primary"
                  onClick={handleMenuClose}
                >
                  Contact
                </Link>
                <Link
                  href="/pricing"
                  className="hover:text-primary"
                  onClick={handleMenuClose}
                >
                  Pricing too
                </Link>
                <Link
                  href="/blog"
                  className="hover:text-primary"
                  onClick={handleMenuClose}
                >
                  Blog
                </Link>
                <Link
                  href="/login"
                  className="hover:text-primary"
                  onClick={handleMenuClose}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="hover:text-primary"
                  onClick={handleMenuClose}
                >
                  Signup
                </Link>
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Navigation links for medium and larger devices */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="hover:text-primary">
            Contact
          </Link>
          <Link href="/pricing" className="hover:text-primary">
            Pricing
          </Link>
          <Link href="/blog" className="hover:text-primary">
            Blog
          </Link>
          <Link href="/login" className="hover:text-primary">
            Login
          </Link>
          <Link href="/signup" className="hover:text-primary">
            Signup
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
