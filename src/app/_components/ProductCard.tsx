"use client";

import { type Product } from "@/data/products";
import { useProductSidebar } from "./ProductSidebarProvider";
import { planetConfig } from "./constants";

interface ProductCardProps {
  product: Product;
  span: "large" | "small";
}

export function ProductCard({ product: p, span }: ProductCardProps) {
  const { setSelectedProduct } = useProductSidebar();
  const cfg = planetConfig[p.key];
  if (!cfg) return null;
  const isLarge = span === "large";

  return (
    <button
      key={p.key}
      type="button"
      onClick={() => setSelectedProduct(p)}
      className={`group relative rounded-xl overflow-hidden op-glass-card border border-[#494847]/30 transition-all text-left cursor-pointer ${isLarge ? "md:col-span-8 p-8" : "md:col-span-4 p-6"} flex flex-col justify-end min-h-[360px]`}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = `${cfg.color}50`)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "rgba(73,72,71,0.3)")
      }
    >
      {/* Ambient glow */}
      <div
        className="op-ambient-glow opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(circle at center, ${cfg.glow.replace("0.4", "0.15")} 0%, transparent 70%)`,
        }}
      />
      {/* Gradient bg */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${cfg.color}30 0%, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {isLarge && (
          <span
            className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded mb-4 border"
            style={{
              background: `${cfg.color}20`,
              color: cfg.color,
              borderColor: `${cfg.color}30`,
            }}
          >
            {p.label}
          </span>
        )}
        <div className="flex items-center gap-2">
          <h3
            className={`font-headline font-bold text-white transition-colors ${isLarge ? "text-3xl mb-2" : "text-xl"}`}
          >
            {p.label}
          </h3>
          {p.comingSoon && (
            <span className="text-[9px] font-bold text-amber-400 bg-amber-500/15 border border-amber-400/30 px-2 py-0.5 rounded-full">
              Soon
            </span>
          )}
        </div>
        <p
          className={`text-[#adaaaa] group-hover:text-white transition-colors ${isLarge ? "max-w-md" : "text-sm mt-2"}`}
        >
          {p.desc}
        </p>
      </div>
    </button>
  );
}
