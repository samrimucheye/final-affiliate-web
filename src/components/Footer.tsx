// src/components/Footer.tsx
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t mt-12 py-8 text-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              AffiliateLink Hub
            </h3>
            <p className="text-sm">
              Your central place to manage and promote affiliate links
              efficiently.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary hover:underline"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-primary hover:underline"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-primary hover:underline"
                >
                  Blog us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="mailto:samrimucheye@gmail.com"
                aria-label="Email"
                className="hover:text-primary"
              >
                <Mail className="h-6 w-6" />
              </a>
              {/* Add your actual social links here */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-primary"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-primary"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} AffiliateLink Hub. All rights
            reserved.
          </p>
          <p className="mt-1">
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary underline"
            >
              Next.js
            </a>{" "}
            and{" "}
            <a
              href="https://firebase.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary underline"
            >
              Firebase
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
