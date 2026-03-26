"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MSIcon } from "./MSIcon";
import { tocSections } from "./constants";

export function TocSidebar() {
  const [activeToc, setActiveToc] = useState("section-1");

  useEffect(() => {
    const handleScroll = () => {
      const offset = 120;
      for (let i = tocSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(tocSections[i].id);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveToc(tocSections[i].id);
          return;
        }
      }
      setActiveToc("section-1");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside className="md:w-1/4 md:self-start md:sticky md:top-24">
      <div className="space-y-8">
        <div className="p-8 rounded-2xl op-glass-card border border-white/5">
          <h4 className="font-headline text-xs font-bold tracking-[0.3em] text-[#a1ffc2] uppercase mb-6">
            Navigation
          </h4>
          <div className="space-y-6 font-body text-sm uppercase tracking-widest">
            {tocSections.map((s) => {
              const isActive = activeToc === s.id;
              return (
                <Link
                  key={s.id}
                  href={`#${s.id}`}
                  className={`flex items-center gap-4 pl-4 transition-all group hover:translate-x-1 duration-200 ${
                    isActive
                      ? "text-[#a1ffc2] font-bold border-l-2 border-[#a1ffc2]"
                      : "text-slate-500 hover:text-white"
                  }`}
                >
                  <MSIcon
                    name={s.icon}
                    fill={isActive}
                    className="text-lg"
                    style={{ fontSize: "18px" }}
                  />
                  {s.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quote card */}
        <div className="p-6 rounded-xl op-glass-card border border-[#a1ffc2]/20 bg-[#a1ffc2]/5">
          <p className="text-xs text-[#adaaaa] font-medium leading-relaxed italic">
            &ldquo;Kiến tạo tương lai số thông qua sự kết hợp giữa
            trí tuệ nhân tạo và tiềm năng con người.&rdquo;
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#a1ffc2]/20 flex items-center justify-center border border-[#a1ffc2]/40">
              <MSIcon
                name="verified"
                className="text-xs text-[#a1ffc2]"
                style={{ fontSize: "12px" }}
              />
            </div>
            <div>
              <p className="text-[10px] font-bold text-white uppercase">
                operis
              </p>
              <p className="text-[9px] text-[#a1ffc2]">
                Core Development
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
