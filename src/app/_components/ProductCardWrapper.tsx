"use client";

import Image from "next/image";
import { type Product } from "@/data/products";
import { useProductSidebar } from "./ProductSidebarProvider";
import { planetConfig } from "./constants";

interface Props {
  product: Product;
  span: "large" | "small";
  children: React.ReactNode;
}

export function ProductCardWrapper({ product, span, children }: Props) {
  const { setSelectedProduct } = useProductSidebar();
  const cfg = planetConfig[product.key];
  const isLarge = span === "large";

  return (
    <button
      type="button"
      onClick={() => setSelectedProduct(product)}
      className={`group relative rounded-xl overflow-hidden op-glass-card border border-[#494847]/30 transition-all text-left cursor-pointer ${isLarge ? "md:col-span-8 p-8" : "md:col-span-4 p-6"} flex flex-col justify-end min-h-[360px]`}
      onMouseEnter={(e) =>
        cfg && (e.currentTarget.style.borderColor = `${cfg.color}50`)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "rgba(73,72,71,0.3)")
      }
    >
      {/* Ambient glow */}
      {cfg && (
        <div
          className="op-ambient-glow opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `radial-gradient(circle at center, ${cfg.glow.replace("0.4", "0.15")} 0%, transparent 70%)`,
          }}
        />
      )}
      {/* Preview image */}
      {product.preview && (
        <Image
          src={product.preview}
          alt={product.label}
          fill
          className="object-cover opacity-40 group-hover:opacity-60 transition-opacity z-0"
        />
      )}
      {/* Gradient bg */}
      {cfg && (
        <div className="absolute inset-0 z-[1]">
          <div
            className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${cfg.color}30 0%, transparent 60%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
      )}
      {/* Server-rendered content */}
      <div className="relative z-[2]">{children}</div>
    </button>
  );
}
