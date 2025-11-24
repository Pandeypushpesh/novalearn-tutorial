"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import type { SafeUser } from "@/lib/auth";

const baseNavLinks = [
  { href: "/", label: "Home" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/dashboard", label: "Dashboard" }
];

interface HeaderClientProps {
  initialUser: SafeUser | null;
}

export default function HeaderClient({ initialUser }: HeaderClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<SafeUser | null>(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const navLinks = useMemo(() => {
    if (!user) {
      return baseNavLinks;
    }

    const links = [...baseNavLinks];
    if (user.role === "admin") {
      links.push({ href: "/dashboard/create-course", label: "Create course" });
    }
    return links;
  }, [user]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="font-semibold text-xl text-slate-900 dark:text-white">
          NovaLearn
        </Link>
        <nav className="hidden md:flex items-center gap-2 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-1 transition hover:text-brand ${
                pathname === link.href ? "bg-slate-100 dark:bg-slate-800" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <SearchBar />
          <ThemeToggle />
          {user ? (
            <>
              <span className="hidden md:block text-sm text-slate-500">
                Hey, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="text-sm font-medium rounded-md border border-slate-200 dark:border-slate-700 px-3 py-1.5 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium rounded-md bg-brand px-3 py-1.5 text-white shadow-sm hover:bg-brand-dark"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}


