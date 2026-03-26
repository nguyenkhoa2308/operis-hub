"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"idle" | "ignite" | "launch">("idle");

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    if (phase !== "idle") return;
    setPhase("ignite");
    setTimeout(() => {
      setPhase("launch");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 250);
    setTimeout(() => setPhase("idle"), 1200);
  };

  return (
    <button
      aria-label="Scroll to top"
      onClick={handleClick}
      className={`group fixed bottom-20 right-5 z-50 w-16 h-20 flex items-center justify-center cursor-pointer transition-all ${
        visible && phase === "idle"
          ? "opacity-100 translate-y-0 duration-500"
          : phase === "ignite"
            ? "opacity-100 translate-y-0 duration-200"
            : phase === "launch"
              ? "opacity-0 -translate-y-[120vh] duration-700 ease-in"
              : "opacity-0 translate-y-16 pointer-events-none duration-500"
      }`}
    >
      {/* Flame glow behind rocket */}
      <span
        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full transition-all duration-300 ${
          phase === "ignite"
            ? "w-8 h-8 bg-orange-500/50 blur-[12px]"
            : phase === "launch"
              ? "w-10 h-14 bg-orange-400/60 blur-[16px]"
              : "w-0 h-0 opacity-0"
        }`}
      />

      {/* Rocket */}
      <svg
        width="40"
        height="56"
        viewBox="0 0 28 48"
        fill="none"
        className={`relative z-10 transition-transform duration-300 ${
          phase === "ignite" ? "animate-[shake_0.1s_infinite]" : ""
        }`}
      >
        {/* Rocket body */}
        <path
          d="M14 2C14 2 8 10 8 24l2 4h8l2-4c0-14-6-22-6-22z"
          fill="#a1ffc2"
        />
        {/* Nose highlight */}
        <path d="M14 2C14 2 11 8 11 14h3V2z" fill="white" opacity="0.25" />
        {/* Window */}
        <circle
          cx="14"
          cy="16"
          r="2.5"
          fill="#0d1a0f"
          stroke="white"
          strokeWidth="0.6"
          opacity="0.9"
        />
        <circle cx="13.5" cy="15.5" r="0.8" fill="#a1ffc2" opacity="0.4" />
        {/* Fins */}
        <path d="M8 24l-3 6h4l1-4z" fill="#a1ffc2" opacity="0.7" />
        <path d="M20 24l3 6h-4l-1-4z" fill="#a1ffc2" opacity="0.7" />
        {/* Bottom */}
        <rect x="10" y="27" width="8" height="2" rx="1" fill="#6ec99a" />

        {/* Flame — ignite: small shake, launch: big trail */}
        <g
          className={`transition-opacity duration-200 ${phase !== "idle" ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}
        >
          <ellipse
            cx="14"
            cy="33"
            rx="3.5"
            ry={phase === "launch" ? 6 : 3}
            fill="#ff6b2b"
            opacity="0.9"
          >
            {phase !== "idle" && (
              <animate
                attributeName="ry"
                values={phase === "launch" ? "6;8;6" : "3;4;3"}
                dur="0.15s"
                repeatCount="indefinite"
              />
            )}
            {phase !== "idle" && (
              <animate
                attributeName="opacity"
                values="0.9;0.7;0.9"
                dur="0.1s"
                repeatCount="indefinite"
              />
            )}
          </ellipse>
          <ellipse
            cx="14"
            cy="32"
            rx="2"
            ry={phase === "launch" ? 4 : 2}
            fill="#ffaa00"
            opacity="0.85"
          >
            {phase !== "idle" && (
              <animate
                attributeName="ry"
                values={phase === "launch" ? "4;5;4" : "2;3;2"}
                dur="0.12s"
                repeatCount="indefinite"
              />
            )}
          </ellipse>
          <ellipse
            cx="14"
            cy="31.5"
            rx="1"
            ry={phase === "launch" ? 2.5 : 1.2}
            fill="#ffe066"
            opacity="0.7"
          >
            {phase !== "idle" && (
              <animate
                attributeName="ry"
                values={phase === "launch" ? "2.5;3;2.5" : "1.2;1.8;1.2"}
                dur="0.1s"
                repeatCount="indefinite"
              />
            )}
          </ellipse>
        </g>
      </svg>

      {/* Smoke particles on ignite */}
      {phase === "ignite" && (
        <>
          <span className="absolute -bottom-1 left-2 w-2 h-2 rounded-full bg-white/20 blur-[3px] animate-ping" />
          <span className="absolute -bottom-2 right-3 w-1.5 h-1.5 rounded-full bg-white/15 blur-[2px] animate-ping [animation-delay:100ms]" />
        </>
      )}
    </button>
  );
}
