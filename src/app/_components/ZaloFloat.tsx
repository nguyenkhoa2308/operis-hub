"use client";

import Link from "next/link";

export function ZaloFloat() {
  return (
    <Link
      href="https://zalo.me/0853336668"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Zalo"
      className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-all duration-300 drop-shadow-[0_4px_20px_rgba(0,104,255,0.4)] hover:drop-shadow-[0_4px_28px_rgba(0,104,255,0.6)]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icons/zalo_icon.svg"
        alt="Zalo"
        width={48}
        height={48}
      />
    </Link>
  );
}
