
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "react-hot-toast";

const DEFAULT_AVATAR = "/image/default-avatar.png";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [imageError, setImageError] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newName = nameRef.current?.value.trim() ?? "";

    if (newName.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে।");
      return;
    }

    if (newName === user?.name) {
      toast("নামে কোনো পরিবর্তন করা হয়নি।");
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: newName,
      });

      if (error) {
        toast.error(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      toast.success("নাম সফলভাবে আপডেট হয়েছে!");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error("লগআউট করা যায়নি। আবার চেষ্টা করো।");
        return;
      }

      toast.success("সফলভাবে লগআউট হয়েছে!");
      router.replace("/signin");
      router.refresh();
    } catch {
      toast.error("লগআউট করার সময় সমস্যা হয়েছে।");
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (isPending || !session || !user) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-16">
        <div className="mx-auto max-w-4xl space-y-5">
          <div className="h-9 w-56 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-36 animate-pulse rounded-2xl bg-white shadow-sm" />
          <div className="h-64 animate-pulse rounded-2xl bg-white shadow-sm" />
        </div>
      </main>
    );
  }

  const avatarSrc =
    !imageError && user.image ? user.image : DEFAULT_AVATAR;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-4xl">
        {/* Page heading */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-green-700">
              হোম
            </Link>
            <span>/</span>
            <span className="text-green-700">আমার প্রোফাইল</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile summary */}
        <section className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-green-50 ring-4 ring-green-50 sm:h-24 sm:w-24">
                <Image
                  src={avatarSrc}
                  alt="প্রোফাইল ছবি"
                  fill
                  sizes="96px"
                  unoptimized
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              </div>

              <div className="min-w-0">
                <h2 className="break-words text-xl font-bold text-gray-900 sm:text-2xl">
                  {user.name || "ব্যবহারকারী"}
                </h2>

                <p className="mt-1 break-all text-sm text-gray-500">
                  {user.email}
                </p>

                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                  অ্যাকাউন্ট সক্রিয়
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? "লগআউট হচ্ছে..." : "লগআউট"}
            </button>
          </div>
        </section>

        {/* Account information */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 border-b border-gray-100 pb-5">
            <h2 className="text-xl font-bold text-gray-900">তথ্য</h2>
            <p className="mt-1 text-sm text-gray-500">
              এখানে আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে পারবেন।
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label
                htmlFor="profile-name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                আপনার নাম
              </label>

              <input
                ref={nameRef}
                id="profile-name"
                name="name"
                type="text"
                defaultValue={user.name || ""}
                placeholder="আপনার নাম লিখুন"
                autoComplete="name"
                minLength={2}
                maxLength={100}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
              />

              <p className="mt-2 text-xs text-gray-400">
                পরিবর্তিত নামটি আপনার অ্যাকাউন্টে সংরক্ষিত হবে।
              </p>
            </div>

            <div>
              <label
                htmlFor="profile-email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                ইমেইল ঠিকানা
              </label>

              <input
                id="profile-email"
                type="email"
                value={user.email}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500 outline-none"
              />

              <p className="mt-2 text-xs text-gray-400">
                ইমেইল ঠিকানা এখানে পরিবর্তন করা যাবে না।
              </p>
            </div>

            <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-400">
                পরিবর্তন সংরক্ষণ করতে নিচের বাটনে ক্লিক করো।
              </p>

              <button
                type="submit"
                disabled={isUpdating}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
              </button>
            </div>
          </form>
        </section>

        <p className="mt-6 text-center text-xs text-gray-400">
          BazarDor — আপনার দৈনন্দিন বাজারের সঙ্গী।
        </p>
      </div>
    </main>
  );
}