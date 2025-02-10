"use client";

import Link from "next/link";
import { AuroraText } from "@/components/magicui/aurora-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <main className="flex flex-col items-center text-center px-4">
        {/* Title Container with increased horizontal padding */}
        <div className="relative overflow-hidden pt-4 pb-8 px-8">
          <h1 className="aurora-title text-4xl font-bold tracking-tighter text-center md:text-5xl lg:text-7xl">
            Medical{" "}
            <span className="overflow-visible inline-block">
              <AuroraText>Algorithms</AuroraText>
            </span>
          </h1>
        </div>

        {/* Subtitle and Avatar */}
        <div className="flex items-center mt-2">
          <span className="font-bold text-lg">Made by @rodriguezdonismd</span>
          <img
            src="/avatar.jpg"
            alt="Avatar"
            className="w-[50px] h-[50px] rounded-full border border-gray-300 object-cover object-center ml-3"
          />
        </div>

        {/* Rainbow Button */}
        <div className="mt-8">
          <Link href="/algorithms">
            <RainbowButton>Browse Algorithms</RainbowButton>
          </Link>
        </div>
      </main>
    </div>
  );
}


