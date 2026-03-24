"use client";

import { useState, useEffect } from "react";
import { OrbitingCircles } from "@/components/orbiting-circles";
import { ProductIcon } from "@/components/product-icon";
import { products, type Product } from "@/data/products";
import { ChevronDown, Construction, X, ExternalLink } from "lucide-react";

/* Chia sản phẩm: 3 vòng trong, 2 vòng ngoài — lấp đều khoảng trống */
const mid = Math.ceil(products.length / 2);
const innerOrbit = products.slice(0, mid);
const outerOrbit = products.slice(mid);

/* ── Icon helper ── */
function PIcon({ name, size = 24 }: { name: string; size?: number }) {
  return <ProductIcon name={name} width={size} height={size} />;
}

/* ── Thẻ vệ tinh + mặt trăng con ── */
function SatelliteCard({
  product,
  onSelect,
}: {
  product: Product;
  onSelect: (p: Product) => void;
}) {
  const children = product.children ?? [];
  const childCount = children.length;

  return (
    <div className="planet-card group relative flex flex-col items-center gap-2">
      {/* Sphere wrapper — moons orbit quanh đây */}
      <div className="relative">
        {/* Mặt trăng con — ẩn mặc định, nổ ra khi hover */}
        {children.map((child, i) => {
          /* Fan đều 360° xung quanh, bắt đầu từ trên (-90°) */
          const angle = -90 + (360 / childCount) * i;
          const rad = (angle * Math.PI) / 180;
          const r = 95;
          const x = Math.cos(rad) * r;
          const y = Math.sin(rad) * r;
          return (
            <div
              key={child.label}
              className="moon-item absolute z-[100] flex flex-col items-center gap-0.5"
              style={
                {
                  left: "50%",
                  top: "50%",
                  "--moon-x": `${x}px`,
                  "--moon-y": `${y}px`,
                  transitionDelay: `${i * 50}ms`,
                } as React.CSSProperties
              }
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1e1e1e] border border-white/15 text-white shadow-md backdrop-blur-sm">
                <PIcon name={child.icon} size={18} />
              </span>
              <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">
                {child.label}
              </span>
            </div>
          );
        })}

        {/* Hành tinh chính */}
        <button
          type="button"
          onClick={() => onSelect(product)}
          aria-label={`Xem chi tiết ${product.label}`}
          className="relative z-10 flex items-center justify-center"
        >
          <span
            className={`planet-sphere flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${product.gradient} text-white shadow-lg ${product.comingSoon ? "opacity-60" : ""}`}
          >
            <PIcon name={product.icon} size={26} />
          </span>
        </button>

        {product.comingSoon && (
          <span className="absolute -top-1 -right-1 z-20 rounded-full bg-amber-500/20 border border-amber-400/40 px-1.5 py-0.5 text-[8px] font-bold text-amber-300 leading-none">
            Soon
          </span>
        )}
      </div>

      {/* Label */}
      <span className="text-[13px] font-bold text-slate-300 group-hover:text-white tracking-tight whitespace-nowrap">
        {product.label}
      </span>
    </div>
  );
}

/* ── Product Sidebar ── */
function ProductSidebar({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const open = product !== null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 z-[201] h-full w-full max-w-md transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {product && (
          <div className="sidebar-panel flex h-full flex-col border-l border-white/8 bg-[#111111]/98 backdrop-blur-2xl shadow-2xl shadow-black/60">
            {/* ── Header (pinned) ── */}
            <div className="shrink-0 border-b border-white/8 p-5 pb-5">
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng"
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/8 border border-white/10 text-slate-400 hover:text-white hover:bg-white/14 transition-colors"
              >
                <X width={16} height={16} strokeWidth={2.5} />
              </button>

              <div className="flex items-center gap-4">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${product.gradient} text-white shadow-lg`}
                >
                  <PIcon name={product.icon} size={24} />
                </span>
                <div>
                  <h2 className="text-lg font-black text-white tracking-tight leading-tight">
                    {product.label}
                  </h2>
                  {product.comingSoon ? (
                    <span className="inline-flex items-center gap-1 mt-1 rounded-full bg-amber-500/15 border border-amber-400/30 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                      <Construction width={10} height={10} />
                      Đang phát triển
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-medium">
                      {product.url.replace("https://", "")}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ── Content (scrollable) ── */}
            <div className="flex-1 overflow-y-auto sidebar-scroll">
              <div className="p-5 space-y-5">
                {/* Mô tả */}
                <div className="rounded-2xl bg-white/[0.04] border border-white/6 p-4">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                    Giới thiệu
                  </h3>
                  <p className="text-[13px] leading-relaxed text-slate-300">
                    {product.desc}
                  </p>
                </div>

                {/* Sub-items */}
                {product.children && product.children.length > 0 && (
                  <div>
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-3 px-1">
                      Tính năng chính
                    </h3>
                    <div className="space-y-2">
                      {product.children.map((child) => (
                        <div
                          key={child.label}
                          className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/6 px-4 py-3 transition-colors hover:bg-white/[0.06]"
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${product.gradient} text-white/90 shadow-sm`}
                          >
                            <PIcon name={child.icon} size={16} />
                          </span>
                          <span className="text-sm font-semibold text-slate-200">
                            {child.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Footer CTA (pinned) ── */}
            <div className="shrink-0 border-t border-white/8 bg-[#0f0f0f] p-5">
              {product.comingSoon ? (
                <div className="flex items-center justify-center gap-2 rounded-xl bg-white/[0.04] border border-white/8 py-3.5 text-sm font-semibold text-slate-500">
                  <Construction width={16} height={16} />
                  Sắp ra mắt
                </div>
              ) : (
                <a
                  href={product.url}
                  className={`flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r ${product.gradient} py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/30`}
                >
                  Truy cập {product.label}
                  <ExternalLink width={14} height={14} strokeWidth={2.5} />
                </a>
              )}
            </div>
          </div>
        )}
      </aside>
    </>
  );
}

export default function Home() {
  const [introReady, setIntroReady] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Đợi 1 tick sau mount rồi mới bật animation
    const t = setTimeout(() => setIntroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col">
      {/* ════════ HERO ════════ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-x-clip">
        {/* BG layers */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="hero-bg absolute inset-0" />
          <div className="absolute inset-0 bg-black/70" />
          <div className="hero-backdrop" />
          <div className="stars" />
          <div className="hero-blob-1" />
          <div className="hero-blob-2" />
          <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-b from-transparent to-[#0d0d0d]" />
        </div>

        {/* ── Floating orbs & constellations (desktop) ── */}
        <div className="hidden lg:block absolute inset-0 z-[5] pointer-events-none">
          {/* ▸ Glowing orbs — left */}
          <div className="absolute left-[6%] top-[18%] h-3 w-3 rounded-full bg-emerald-400/40 shadow-[0_0_20px_6px_rgba(52,211,153,0.2)] float-badge-1" />
          <div className="absolute left-[12%] top-[35%] h-2 w-2 rounded-full bg-emerald-300/30 shadow-[0_0_14px_4px_rgba(52,211,153,0.15)] float-badge-2" />
          <div className="absolute left-[4%] top-[55%] h-4 w-4 rounded-full bg-teal-400/25 shadow-[0_0_28px_8px_rgba(45,212,191,0.15)] float-badge-3" />
          <div className="absolute left-[9%] top-[70%] h-1.5 w-1.5 rounded-full bg-sky-400/35 shadow-[0_0_12px_4px_rgba(56,189,248,0.15)] float-badge-1" />
          <div className="absolute left-[15%] top-[48%] h-2.5 w-2.5 rounded-full bg-emerald-400/20 shadow-[0_0_16px_5px_rgba(52,211,153,0.1)] float-badge-4" />

          {/* ▸ Glowing orbs — right */}
          <div className="absolute right-[7%] top-[22%] h-3.5 w-3.5 rounded-full bg-violet-400/30 shadow-[0_0_24px_7px_rgba(167,139,250,0.15)] float-badge-3" />
          <div className="absolute right-[11%] top-[42%] h-2 w-2 rounded-full bg-emerald-400/35 shadow-[0_0_14px_4px_rgba(52,211,153,0.15)] float-badge-1" />
          <div className="absolute right-[4%] top-[60%] h-3 w-3 rounded-full bg-blue-400/25 shadow-[0_0_20px_6px_rgba(96,165,250,0.15)] float-badge-4" />
          <div className="absolute right-[14%] top-[28%] h-1.5 w-1.5 rounded-full bg-teal-300/30 shadow-[0_0_10px_3px_rgba(94,234,212,0.15)] float-badge-2" />
          <div className="absolute right-[8%] top-[75%] h-2 w-2 rounded-full bg-emerald-300/25 shadow-[0_0_14px_4px_rgba(110,231,183,0.12)] float-badge-3" />

          {/* ▸ Constellation — left cluster */}
          <svg
            className="absolute left-[6%] top-[15%] w-[240px] h-[360px] opacity-50 float-badge-2"
            viewBox="0 0 200 300"
            fill="none"
          >
            <circle cx="30" cy="40" r="3.5" fill="#6ee7b7" />
            <circle cx="85" cy="80" r="2.5" fill="#6ee7b7" />
            <circle cx="50" cy="150" r="3" fill="#5eead4" />
            <circle cx="120" cy="120" r="2" fill="#6ee7b7" />
            <circle cx="70" cy="220" r="3" fill="#5eead4" />
            <circle cx="140" cy="200" r="2.5" fill="#6ee7b7" />
            <line
              x1="30"
              y1="40"
              x2="85"
              y2="80"
              stroke="#6ee7b7"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            <line
              x1="85"
              y1="80"
              x2="120"
              y2="120"
              stroke="#6ee7b7"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <line
              x1="85"
              y1="80"
              x2="50"
              y2="150"
              stroke="#5eead4"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            <line
              x1="50"
              y1="150"
              x2="70"
              y2="220"
              stroke="#5eead4"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            <line
              x1="120"
              y1="120"
              x2="140"
              y2="200"
              stroke="#6ee7b7"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
            <line
              x1="70"
              y1="220"
              x2="140"
              y2="200"
              stroke="#5eead4"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
          </svg>

          {/* ▸ Constellation — right cluster */}
          <svg
            className="absolute right-[6%] top-[22%] w-[220px] h-[340px] opacity-45 float-badge-4"
            viewBox="0 0 180 280"
            fill="none"
          >
            <circle cx="150" cy="30" r="2.5" fill="#a78bfa" />
            <circle cx="100" cy="70" r="3.5" fill="#6ee7b7" />
            <circle cx="140" cy="140" r="2.5" fill="#a78bfa" />
            <circle cx="60" cy="110" r="2" fill="#6ee7b7" />
            <circle cx="90" cy="200" r="3" fill="#5eead4" />
            <circle cx="40" cy="250" r="2.5" fill="#6ee7b7" />
            <line
              x1="150"
              y1="30"
              x2="100"
              y2="70"
              stroke="#a78bfa"
              strokeOpacity="0.4"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="70"
              x2="60"
              y2="110"
              stroke="#6ee7b7"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="70"
              x2="140"
              y2="140"
              stroke="#a78bfa"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            <line
              x1="60"
              y1="110"
              x2="90"
              y2="200"
              stroke="#6ee7b7"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            <line
              x1="140"
              y1="140"
              x2="90"
              y2="200"
              stroke="#5eead4"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
            <line
              x1="90"
              y1="200"
              x2="40"
              y2="250"
              stroke="#6ee7b7"
              strokeOpacity="0.2"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* ── Desktop: Orbit layout ── */}
        <div className="relative z-10 hidden lg:flex h-[820px] w-[820px] items-center justify-center">
          {/* Faint concentric circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-[440px] h-[440px] rounded-full border border-white/[0.04]" />
            <div className="absolute w-[640px] h-[640px] rounded-full border border-white/[0.025]" />
            <div className="absolute w-[820px] h-[820px] rounded-full border border-white/[0.015]" />
          </div>
          {/* Center glow — larger */}
          <div
            className={`center-glow ${introReady ? "hero-intro-glow" : "opacity-0"}`}
          />

          {/* Floating particles */}
          <div className="hero-particles absolute inset-0 pointer-events-none" />

          {/* Text center — z-10, nằm dưới orbit */}
          <div className="pointer-events-none select-none z-10 flex flex-col items-center gap-3">
            <span
              className={`hero-badge ${introReady ? "hero-intro-badge" : "opacity-0"}`}
            >
              <span className="badge-dot" />
              Hệ sinh thái công cụ số
            </span>
            <h1
              className={`text-5xl font-black tracking-tighter text-white sm:text-7xl ${introReady ? "hero-intro-title" : "opacity-0"}`}
            >
              Operis
            </h1>
            <p
              className={`hero-subtitle ${introReady ? "hero-intro-subtitle" : "opacity-0"}`}
            >
              kết nối · tự động · tăng trưởng
            </p>
          </div>

          {/* Orbit — z-20, nằm trên text */}
          <div
            className={`absolute inset-0 z-20 flex items-center justify-center ${introReady ? "hero-intro-orbits" : "opacity-0"}`}
          >
            <OrbitingCircles
              radius={220}
              duration={40}
              iconSize={180}
              speed={1}
            >
              {innerOrbit.map((p) => (
                <SatelliteCard
                  key={p.key}
                  product={p}
                  onSelect={setSelectedProduct}
                />
              ))}
            </OrbitingCircles>

            <OrbitingCircles
              radius={380}
              duration={50}
              iconSize={180}
              speed={1}
              reverse
            >
              {outerOrbit.map((p) => (
                <SatelliteCard
                  key={p.key}
                  product={p}
                  onSelect={setSelectedProduct}
                />
              ))}
            </OrbitingCircles>
          </div>
        </div>

        {/* ── Mobile/Tablet: Grid layout ── */}
        <div className="relative z-10 flex flex-col items-center gap-10 px-6 py-16 lg:hidden">
          <div className="flex flex-col items-center gap-2">
            <span className="hero-badge">
              <span className="badge-dot" />
              Hệ sinh thái công cụ số
            </span>
            <h1 className="text-5xl font-black tracking-tighter text-white">
              operis
            </h1>
            <p className="hero-subtitle">kết nối · tự động · tăng trưởng</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-md">
            {products.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setSelectedProduct(p)}
                className="sat-card !flex-col !gap-2 !px-4 !py-5 items-center text-center"
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} text-white shadow-sm ${p.comingSoon ? "opacity-60" : ""}`}
                >
                  <PIcon name={p.icon} />
                </span>
                <span className="text-[13px] font-bold text-slate-200 tracking-tight">
                  {p.label}
                </span>
                {p.comingSoon && (
                  <span className="rounded-full bg-amber-500/20 border border-amber-400/40 px-1.5 py-0.5 text-[9px] font-bold text-amber-300 leading-none">
                    Sắp ra mắt
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Gợi ý cuộn */}
        <div className="scroll-indicator absolute bottom-8 z-10 flex flex-col items-center gap-1 text-slate-500">
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase">
            Khám phá
          </span>
          <ChevronDown width={16} height={16} />
        </div>
      </section>

      {/* ════════ BANNER SAN PHAM — nhap nho ════════ */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="intro-dot-grid-visible opacity-20" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
        </div>
        <div className="flex gap-4 sm:gap-5 px-6 items-start justify-center">
          {products.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setSelectedProduct(p)}
              className={`group relative flex-none w-40 sm:w-48 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ${i % 2 !== 0 ? "translate-y-10 sm:translate-y-14" : ""}`}
            >
              <div className="aspect-[3/4] relative">
                {/* Gradient bg with color per product */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-90`}
                />
                {/* Noise texture overlay */}
                <div className="banner-noise" />
                {/* Large icon watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity">
                  <PIcon name={p.icon} size={80} />
                </div>
                {/* Bottom label */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-4 pb-4 pt-10">
                  <span className="block text-sm font-bold text-white tracking-tight">
                    {p.label}
                  </span>
                  {p.comingSoon ? (
                    <span className="mt-1 inline-flex rounded-full bg-white/20 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold text-white/90">
                      Soon
                    </span>
                  ) : (
                    <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-white/60 font-medium">
                      <ExternalLink size={9} /> Truy cập
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ════════ GIOI THIEU ════════ */}
      <section className="relative flex justify-center px-6 py-28 sm:py-36 overflow-x-clip">
        <div className="absolute inset-0 pointer-events-none">
          <div className="intro-dot-grid-visible opacity-20" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl">
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
            {/* Sidebar TOC */}
            <nav className="sm:w-64 shrink-0 sm:sticky sm:top-8 sm:self-start">
              <div className="rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 shadow-xl backdrop-blur-sm">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-400/80 mb-2">
                  <span className="h-px w-4 bg-emerald-500/60" />
                  Tổng quan
                </span>
                <h2 className="text-lg font-extrabold tracking-tight text-white mb-5">
                  Giới thiệu về Operis
                </h2>
                <div className="relative ml-1.5">
                  <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/40 via-blue-500/30 to-violet-500/20" />
                  <ul className="flex flex-col gap-1">
                    {[
                      {
                        href: "#operis-la-gi",
                        label: "Operis là gì?",
                        num: "01",
                        color:
                          "hover:text-emerald-400 hover:border-emerald-500 group-hover:bg-emerald-500/20",
                      },
                      {
                        href: "#dac-diem",
                        label: "Đặc điểm nổi bật",
                        num: "02",
                        color:
                          "hover:text-blue-400 hover:border-blue-500 group-hover:bg-blue-500/20",
                      },
                      {
                        href: "#san-pham",
                        label: "Các sản phẩm",
                        num: "03",
                        color:
                          "hover:text-violet-400 hover:border-violet-500 group-hover:bg-violet-500/20",
                      },
                    ].map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className={`group relative flex items-center gap-3 rounded-lg py-3 pl-6 pr-3 text-[15px] text-slate-300 transition-all ${item.color}`}
                        >
                          <span
                            className={`absolute left-0 h-3 w-3 rounded-full border-2 border-white/20 bg-[#0d0d0d] transition-all ${item.color}`}
                          />
                          <span className="text-xs font-bold text-slate-500 tabular-nums transition-colors group-hover:text-current">
                            {item.num}
                          </span>
                          <span className="font-semibold">{item.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-16">
              {/* I */}
              <div id="operis-la-gi" className="scroll-mt-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-xs font-black shadow-lg shadow-emerald-500/25">
                    01
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight text-white">
                    Operis là gì?
                  </h3>
                </div>
                <div className="rounded-2xl border border-white/6 bg-white/[0.03] p-6 space-y-4 text-base leading-relaxed text-slate-300">
                  <p>
                    Operis là hệ sinh thái sản phẩm số — nơi mỗi công cụ được
                    xây dựng để giải quyết một bài toán cụ thể, nhưng khi kết
                    hợp lại, chúng tạo thành một nền tảng vận hành toàn diện.
                  </p>
                  <p>
                    Đến với Operis, bạn sẽ được trải nghiệm một hệ sinh thái
                    được thiết kế riêng cho hiệu suất và sự tiện lợi, nơi mọi
                    công cụ đều hoạt động mượt mà và đồng bộ với nhau.
                  </p>
                </div>
              </div>

              {/* II */}
              <div id="dac-diem" className="scroll-mt-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-xs font-black shadow-lg shadow-blue-500/25">
                    02
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight text-white">
                    Đặc điểm nổi bật
                  </h3>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Độc lập nhưng thống nhất",
                      desc: "Mỗi sản phẩm hoạt động riêng lẻ hoàn chỉnh. Không phụ thuộc, không bắt buộc dùng cả hệ sinh thái.",
                      num: "01",
                      numColor: "text-emerald-400/15",
                      border: "border-white/8 hover:border-emerald-500/30",
                      titleColor: "text-white",
                    },
                    {
                      title: "Kết nối liền mạch",
                      desc: "Khi dùng nhiều sản phẩm cùng lúc, dữ liệu và trải nghiệm được đồng bộ tự động giữa các công cụ.",
                      num: "02",
                      numColor: "text-blue-400/15",
                      border: "border-white/8 hover:border-blue-500/30",
                      titleColor: "text-white",
                    },
                    {
                      title: "Thiết kế cho hiệu suất",
                      desc: "Giao diện tối giản, tốc độ nhanh, tập trung vào việc giúp người dùng hoàn thành công việc nhanh nhất.",
                      num: "03",
                      numColor: "text-violet-400/15",
                      border: "border-white/8 hover:border-violet-500/30",
                      titleColor: "text-white",
                    },
                  ].map((f) => (
                    <div
                      key={f.num}
                      className={`group overflow-hidden rounded-2xl border ${f.border} bg-white/[0.04] px-6 pt-4 pb-6 transition-all duration-300 hover:bg-white/[0.07]`}
                    >
                      <span
                        className={`block text-[110px] font-black leading-[0.9] tracking-tighter select-none -ml-1 mb-3 ${f.numColor}`}
                      >
                        {f.num}
                      </span>
                      <h4 className="text-[15px] font-bold text-white mb-2">
                        {f.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">
                        {f.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* III */}
              <div id="san-pham" className="scroll-mt-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xs font-black shadow-lg shadow-violet-500/25">
                    03
                  </span>
                  <h3 className="text-2xl font-extrabold tracking-tight text-white">
                    Các sản phẩm
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {products.map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setSelectedProduct(p)}
                      className="group relative overflow-hidden flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.04] p-4 text-left transition-all duration-300 hover:border-white/14 hover:bg-white/[0.07] hover:shadow-lg backdrop-blur-sm"
                    >
                      {/* Gradient top accent */}
                      <div
                        className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${p.gradient} opacity-40 group-hover:opacity-80 transition-opacity`}
                      />
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} text-white shadow-md ${p.comingSoon ? "opacity-70" : ""}`}
                      >
                        <PIcon name={p.icon} size={20} />
                      </span>
                      <div className="min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="text-base font-bold text-slate-100 group-hover:text-white transition-colors">
                            {p.label}
                          </span>
                          {p.comingSoon && (
                            <span className="rounded-full bg-amber-500/15 border border-amber-400/30 px-1.5 py-0.5 text-[9px] font-bold text-amber-400 leading-none">
                              Soon
                            </span>
                          )}
                        </span>
                        <p className="mt-1 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors line-clamp-2">
                          {p.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative px-6 pb-10 overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mb-6" />

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[12px] text-slate-600">
            <p>&copy; {new Date().getFullYear()} Operis. Bảo lưu mọi quyền.</p>
            <p>
              Thiết kế bởi{" "}
              <span className="text-slate-400 font-semibold">Operis Team</span>
            </p>
          </div>
        </div>
      </footer>
      {/* Product Sidebar */}
      <ProductSidebar
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
