"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  Accessibility,
  ShoppingBag,
  Info,
  Mail,
  Tag,
  BookOpen,
  LogIn,
  UserPlus,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
  SheetHeader,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import AccessibilityOptionsDialog from "@/components/AccessibilityOptionsDialog";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import SignOut from "./SignOut";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user ?? null;

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    {
      href: "/",
      label: "Home",
      icon: <ShoppingBag className="mr-2 h-4 w-4" />,
    },
    { href: "/about", label: "About", icon: <Info className="mr-2 h-4 w-4" /> },
    {
      href: "/contact",
      label: "Contact",
      icon: <Mail className="mr-2 h-4 w-4" />,
    },
    {
      href: "/pricing",
      label: "Pricing",
      icon: <Tag className="mr-2 h-4 w-4" />,
    },
    {
      href: "/blog",
      label: "Blog",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
    },
    {
      href: "/admin/products",
      label: "Admin Products",
      icon: <ShoppingBag className="mr-2 h-4 w-4" />,
    },

    {
      href: "/signup",
      label: "Sign Up",
      icon: <UserPlus className="mr-2 h-4 w-4" />, // Added signup icon
    },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b shadow-sm fixed top-0 left-0 right-0 w-full z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-primary"
          onClick={handleMenuClose}
        >
          AffiliateLink Hub
        </Link>

        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="p-4 border-b">
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>Explore AffiliateLink Hub</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col p-4 space-y-1">
                {navLinks
                  .filter((link) => {
                    if (link.href === "/admin/products") {
                      return user && user.role === "admin";
                    }
                    return true;
                  })
                  .map((link) => (
                    <Link key={link.href} href={link.href} passHref>
                      <Button
                        key={link.href + link.label}
                        variant="ghost"
                        className="w-full justify-start text-base"
                        onClick={handleMenuClose}
                      >
                        {link.icon}
                        {link.label}
                      </Button>
                    </Link>
                  ))}
              </div>
              <Separator className="my-3" />
              {user ? (
                <SignOut />
              ) : (
                <Link href="/login" passHref>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-base"
                    onClick={handleMenuClose}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              )}
              <div className="flex items-center justify-between px-2 pt-2">
                <p className="text-sm text-muted-foreground">Theme</p>
                <ModeToggle />
              </div>
              <div className="flex items-center justify-between px-2 pt-2">
                <p className="text-sm text-muted-foreground">Accessibility</p>
                <AccessibilityOptionsDialog onDialogClose={handleMenuClose}>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Accessibility Options"
                  >
                    <Accessibility className="h-5 w-5" />
                  </Button>
                </AccessibilityOptionsDialog>
              </div>
              <SheetClose asChild>
                <Button
                  variant="ghost"
                  className="absolute top-3 right-3 h-8 w-8 p-0"
                  aria-label="Close menu"
                >
                  {/* <Menu className="h-5 w-5" /> */}
                </Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          {navLinks
            .filter((link) => {
              if (link.href === "/admin/products") {
                return user && user.role === "admin";
              }
              return true;
            })
            .map((link) => (
              <Link key={link.href} href={link.href} passHref>
                <Button
                  key={link.href + link.label}
                  variant="ghost"
                  className="w-full justify-start text-base"
                  onClick={handleMenuClose}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          {user ? (
            <SignOut />
          ) : (
            <Link href="/login" passHref>
              <Button
                variant="ghost"
                className="w-full justify-start text-base"
                onClick={handleMenuClose}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
          <ModeToggle />
          <AccessibilityOptionsDialog>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Accessibility Options"
            >
              <Accessibility className="h-5 w-5" />
            </Button>
          </AccessibilityOptionsDialog>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
