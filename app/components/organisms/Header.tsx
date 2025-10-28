"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "../atoms";
import { NavLink, HamburgerIcon } from "../molecules";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-stone-700 text-stone-50 relative">
      <Container className="py-3 relative">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold text-stone-50 hover:text-stone-200 transition-colors"
          >
            Realtor
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-md hover:bg-stone-600 transition-colors"
            aria-label="Toggle menu"
          >
            <HamburgerIcon isOpen={isMenuOpen} />
          </button>

          <nav className="hidden sm:flex gap-6">
            <NavLink href="/" variant="desktop">
              Home
            </NavLink>
            <NavLink href="/owners" variant="desktop">
              Owners
            </NavLink>
          </nav>

          {isMenuOpen && (
            <nav className="absolute top-full left-0 right-0 bg-stone-700 sm:hidden border-t border-stone-600">
              <div className="flex flex-col">
                <NavLink
                  href="/"
                  variant="mobile"
                  onClick={() => setIsMenuOpen(false)}
                  withBorder
                >
                  Home
                </NavLink>
                <NavLink
                  href="/owners"
                  variant="mobile"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Owners
                </NavLink>
              </div>
            </nav>
          )}
        </div>
      </Container>
    </header>
  );
}
