"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { type Product } from "@/data/products";
import { MSIcon } from "./MSIcon";
import { planetConfig, planetBg, subIconMap } from "./constants";
import type { PlanetCfg } from "./constants";

/* ── Context ── */
interface ProductSidebarContextValue {
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
}

const ProductSidebarContext = createContext<ProductSidebarContextValue | null>(
  null
);

export function useProductSidebar() {
  const ctx = useContext(ProductSidebarContext);
  if (!ctx)
    throw new Error(
      "useProductSidebar must be used within ProductSidebarProvider"
    );
  return ctx;
}

/* ── Orbiting planet card ── */
export function OrbitPlanet({
  product,
  cfg,
  onSelect,
}: {
  product: Product;
  cfg: PlanetCfg;
  onSelect: (p: Product) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(product)}
      aria-label={`Xem chi tiết ${product.label}`}
      className="op-planet-card relative flex flex-col items-center gap-2"
    >
      {/* Planet sphere */}
      <div
        className={`op-orbit-planet ${planetBg[product.key]}`}
        style={{
          width: cfg.px,
          height: cfg.px,
          boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.8), inset 4px 4px 10px rgba(255,255,255,0.2), 0 0 20px ${cfg.glow}`,
        }}
      >
        <div className="op-planet-texture" />
      </div>
      {/* Label pill */}
      <div className="op-planet-label">
        <MSIcon
          name={cfg.icon}
          fill
          className="text-sm"
          style={{ color: cfg.color, fontSize: "14px" }}
        />
        <span className="op-label-text">{product.label}</span>
      </div>
    </button>
  );
}

/* ── Product Sidebar (right drawer) ── */
function ProductSidebar({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const open = product !== null;
  const cfg = product ? planetConfig[product.key] : null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 z-[201] h-full w-full max-w-[460px] transition-transform duration-400 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {product && cfg && (
          <div className="flex h-full flex-col bg-[#0a0a0a]/95 backdrop-blur-2xl border-l border-white/6">
            {/* ── Header ── */}
            <div className="shrink-0 relative overflow-hidden px-7 pt-7 pb-6">
              {/* Subtle glow */}
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[80px] opacity-25 pointer-events-none"
                style={{ background: cfg.color }}
              />

              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng"
                className="absolute top-5 right-5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                <MSIcon name="close" style={{ fontSize: "16px" }} />
              </button>

              {/* Planet + title */}
              <div className="relative z-10 flex items-center gap-5">
                <div
                  className={`shrink-0 flex h-16 w-16 items-center justify-center rounded-full ${planetBg[product.key]}`}
                  style={{
                    boxShadow: `inset -6px -6px 14px rgba(0,0,0,0.7), inset 3px 3px 8px rgba(255,255,255,0.15), 0 0 24px ${cfg.glow}`,
                  }}
                >
                  <MSIcon
                    name={cfg.icon}
                    fill
                    style={{ fontSize: "28px", color: "#fff" }}
                  />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white font-headline tracking-tight">
                    {product.label}
                  </h2>
                  {product.comingSoon ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 mt-1">
                      <MSIcon
                        name="construction"
                        style={{ fontSize: "12px" }}
                      />
                      Đang phát triển
                    </span>
                  ) : (
                    <Link
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium mt-1 transition-colors"
                      style={{ color: cfg.color }}
                    >
                      <MSIcon name="language" style={{ fontSize: "13px" }} />
                      <span className="hover:underline">
                        {product.url.replace("https://", "")}
                      </span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div
                className="absolute bottom-0 inset-x-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${cfg.color}30, transparent)`,
                }}
              />
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
              {/* Description */}
              <p className="text-[14px] leading-relaxed text-slate-300">
                {product.desc}
              </p>

              {/* Features list */}
              {product.children && product.children.length > 0 && (
                <div>
                  <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2">
                    <span
                      className="h-px flex-1"
                      style={{ background: `${cfg.color}15` }}
                    />
                    Tính năng
                    <span
                      className="h-px flex-1"
                      style={{ background: `${cfg.color}15` }}
                    />
                  </h3>
                  <div className="space-y-2">
                    {product.children.map((child) => (
                      <div
                        key={child.label}
                        className="group flex items-center gap-3 rounded-xl bg-white/[0.02] border border-white/5 px-4 py-3 transition-all hover:bg-white/[0.05] hover:border-white/10"
                      >
                        <span
                          className="shrink-0 flex h-9 w-9 items-center justify-center rounded-lg"
                          style={{
                            background: `${cfg.color}10`,
                            border: `1px solid ${cfg.color}18`,
                          }}
                        >
                          <MSIcon
                            name={subIconMap[child.icon] || "circle"}
                            fill
                            style={{ fontSize: "18px", color: cfg.color }}
                          />
                        </span>
                        <span className="text-[13px] font-semibold text-slate-300 group-hover:text-white transition-colors">
                          {child.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Footer CTA ── */}
            <div
              className="shrink-0 px-7 py-5"
              style={{ borderTop: `1px solid ${cfg.color}10` }}
            >
              {product.comingSoon ? (
                <div className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.03] border border-white/8 py-3.5 text-sm font-semibold text-slate-500">
                  <MSIcon name="schedule" style={{ fontSize: "16px" }} />
                  Sắp ra mắt
                </div>
              ) : (
                <Link
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 rounded-xl py-3.5 text-sm font-bold transition-all hover:scale-[1.02]"
                  style={{
                    background: cfg.color,
                    boxShadow: `0 0 0 1px ${cfg.color}, 0 8px 24px ${cfg.glow}`,
                    color: "#000",
                  }}
                >
                  Truy cập {product.label}
                  <MSIcon
                    name="arrow_forward"
                    className="transition-transform group-hover:translate-x-1"
                    style={{ fontSize: "16px" }}
                  />
                </Link>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

/* ── Provider ── */
export function ProductSidebarProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <ProductSidebarContext.Provider value={{ selectedProduct, setSelectedProduct }}>
      {children}
      <ProductSidebar
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </ProductSidebarContext.Provider>
  );
}
