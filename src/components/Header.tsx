"use client";

import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { headerCta, navigationLinks } from "@/data/siteContent";

/** Sticky header — лого слева, навигация по центру, CTA справа */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`header-bar fixed left-0 right-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-300 ${
        scrolled ? "header-bar--scrolled" : ""
      }`}
    >
      <div className="section-shell flex items-center justify-between py-4 md:py-5">
        {/* Логотип слева — как на макете */}
        <a href="#" className="header-logo shrink-0" aria-label="DIZARX">
          <Image
            src="/dizarx-logo.png"
            alt="DIZARX"
            width={899}
            height={258}
            className="h-7 w-auto md:h-8"
            priority
          />
        </a>

        {/* Desktop nav */}
        <ul className="header-nav absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 md:flex md:gap-7">
          {navigationLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="header-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <a
            href={headerCta.href}
            className="header-cta-btn hidden md:inline-flex"
          >
            {headerCta.label}
            <ArrowRight size={15} strokeWidth={2} />
          </a>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] text-white md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="header-mobile-menu section-shell pb-5 md:hidden">
          <ul className="flex flex-col gap-4 border-t border-[rgba(255,255,255,0.08)] pt-4">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-base text-[var(--hero-subtitle)] transition-colors hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={headerCta.href}
            className="hero-btn-primary mt-5 w-full justify-center"
            onClick={() => setMobileOpen(false)}
          >
            {headerCta.label}
            <ArrowRight size={15} />
          </a>
        </div>
      )}
    </header>
  );
}
