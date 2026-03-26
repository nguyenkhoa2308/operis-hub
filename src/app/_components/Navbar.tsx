"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { navSections } from "./constants";

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const offset = 120;
      for (let i = navSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(navSections[i].id);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveSection(navSections[i].id);
          return;
        }
      }
      setActiveSection("hero");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-[60] bg-black/60 backdrop-blur-xl border-b border-white/5">
      <div className="flex justify-between items-center w-full px-8 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src="/images/logo.png"
            alt="Operis"
            width={36}
            height={36}
            className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(89%) sepia(20%) saturate(500%) hue-rotate(82deg) brightness(103%) contrast(98%)",
            }}
          />
          <span className="text-xl font-bold tracking-tighter text-[#a1ffc2] uppercase font-headline -ml-1">
            peris
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 font-headline text-sm tracking-tight">
          {navSections.map((s) => (
            <Link
              key={s.id}
              href={`#${s.id}`}
              className={`transition-colors ${activeSection === s.id ? "text-[#a1ffc2] font-semibold" : "text-slate-400 font-medium hover:text-white"}`}
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
