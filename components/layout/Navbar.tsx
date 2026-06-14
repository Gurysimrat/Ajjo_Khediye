"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/characters", label: "Characters" },
  { href: "/stories", label: "Stories" },
  { href: "/games", label: "Games" },
  { href: "/schools", label: "Schools" },
  { href: "/creators", label: "Creators" },
  { href: "/about", label: "About" },
];

/**
 * Site navigation — styled as a village signpost rather than a
 * corporate navbar. Transparent over the hero, solid on scroll
 * (handled via backdrop blur + translucent cream background).
 */
export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
      <nav
        className={cn(
          "mx-auto max-w-6xl flex items-center justify-between",
          "rounded-[var(--radius-toy-lg)] px-5 py-3",
          "bg-paper/80 backdrop-blur-md shadow-[var(--shadow-toy-md)]",
          "border border-wood-light/30"
        )}
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-display text-xl font-bold text-terracotta flex items-center gap-2"
        >
          <span aria-hidden>🪁</span>
          <span>Ajjo Khediye</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-display text-sm font-medium px-3 py-2 rounded-[var(--radius-toy-pill)] text-ink hover:bg-cream-deep transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/join-us"
          className="hidden lg:inline-flex font-display text-sm font-semibold px-5 py-2 rounded-[var(--radius-toy-pill)] bg-marigold text-ink shadow-[var(--shadow-toy-sm)] hover:shadow-[var(--shadow-toy-md)] transition-shadow"
        >
          Join Us
        </Link>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-[var(--radius-toy-sm)] hover:bg-cream-deep transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="block w-6 h-0.5 bg-ink mb-1.5" />
          <span className="block w-6 h-0.5 bg-ink mb-1.5" />
          <span className="block w-6 h-0.5 bg-ink" />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mx-auto max-w-6xl mt-2 rounded-[var(--radius-toy-md)] bg-paper shadow-[var(--shadow-toy-md)] p-4 flex flex-col gap-1"
          >
            {[...navLinks, { href: "/join-us", label: "Join Us" }].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-display block px-3 py-2 rounded-[var(--radius-toy-sm)] text-ink hover:bg-cream-deep transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
