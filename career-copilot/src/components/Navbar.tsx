"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/internship", label: "Internships" },
  { href: "/interview", label: "Interview" },
  { href: "/gravity", label: "Gravity" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 glass-dark">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-white text-sm tracking-tight">
          <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
            <Zap size={14} className="text-black" />
          </div>
          Career Copilot
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                ${pathname === l.href
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white hover:bg-white/8"
                }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/60 hover:text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/8 bg-black/95 px-4 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${pathname === l.href ? "bg-white text-black" : "text-white/60 hover:text-white hover:bg-white/8"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
