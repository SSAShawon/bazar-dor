"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavItem from "./NavItem";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

const DEFAULT_AVATAR = "/image/default-avatar.png";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const user = session?.user;

  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });
    setDate(today);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await signOut();

      if (error) {
        toast.error("লগআউট করা যায়নি। আবার চেষ্টা করো।");
        return;
      }

      setMenuOpen(false);
      toast.success("সফলভাবে লগআউট হয়েছে!");
      router.push("/signin");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে।");
    }
  };

  const avatar = !imageError && user?.image ? user.image : DEFAULT_AVATAR;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-7">
        <div className="flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-600 shadow-sm">
              <Image
                src="/image/logo-icon.png"
                alt="বাজার দর"
                width={44}
                height={44}
                className="h-10 w-10 object-contain"
                priority
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-xl font-extrabold leading-tight text-gray-900 sm:text-2xl">
                বাজার দর
              </h1>
              <p className="mt-0.5 text-xs font-medium text-gray-500 sm:text-sm">
                {date}
              </p>
            </div>
          </Link>

          {/* Authentication */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {isPending ? (
              <div className="h-10 w-24 animate-pulse rounded-full bg-gray-100" />
            ) : user ? (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-expanded={menuOpen}
                  aria-label="প্রোফাইল মেনু"
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white py-1.5 pl-1.5 pr-2 transition hover:border-green-300 hover:bg-green-50 sm:gap-3 sm:pl-2 sm:pr-3"
                >
                  {/* Profile photo */}
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-green-100 ring-2 ring-green-100">
                    <Image
                      src={avatar}
                      alt="Profile photo"
                      fill
                      sizes="40px"
                      className="object-cover"
                      onError={() => setImageError(true)}
                    />
                  </div>

                  {/* User name */}
                  <div className="hidden max-w-32 text-left sm:block">
                    <p className="truncate text-sm font-bold text-gray-800">
                      {user.name || "ব্যবহারকারী"}
                    </p>
                    <p className="text-xs text-green-600">আমার অ্যাকাউন্ট</p>
                  </div>

                  {/* Dropdown arrow */}
                  <svg
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                {menuOpen && (
                  <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
                    <div className="border-b border-gray-100 bg-green-50 p-4">
                      <p className="truncate font-bold text-gray-900">
                        {user.name || "ব্যবহারকারী"}
                      </p>
                      <p className="mt-1 truncate text-sm text-gray-500">
                        {user.email}
                      </p>
                    </div>

                    <div className="p-2">
                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="8" r="4" />
                          <path d="M5 21v-2a7 7 0 0114 0v2" />
                        </svg>
                        আমার প্রোফাইল
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          aria-hidden="true"
                        >
                          <path d="M10 17l5-5-5-5" />
                          <path d="M15 12H3" />
                          <path d="M12 3h6a2 2 0 012 2v14a2 2 0 01-2 2h-6" />
                        </svg>
                        লগআউট
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-xl border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 transition hover:border-green-600 hover:bg-green-50 hover:text-green-700 sm:px-5"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-xl border border-green-600 bg-green-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-700 sm:px-5"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <NavItem />
    </nav>
  );
}
