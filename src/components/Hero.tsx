"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });

    setDate(today);
  }, []);
  return (
    <section className="bg-white">
      <div className="mx-auto my-8 grid max-w-7xl items-center gap-10 rounded-2xl border border-gray-100 bg-white px-5 py-14 shadow-md sm:px-7 md:min-h-[520px] md:grid-cols-2 lg:px-8">
        <div>
          <div className="mb-5 inline-flex rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
            {date}
          </div>

          <h1 className="max-w-xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-8 inline-flex rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/image/bazar-hero.png"
            alt="বাজারের পণ্য"
            width={500}
            height={500}
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
