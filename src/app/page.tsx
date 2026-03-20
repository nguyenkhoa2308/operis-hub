"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { OrbitingCircles } from "@/components/orbiting-circles";
import { ProductIcon } from "@/components/product-icon";
import { products, type Product } from "@/data/products";
import { ChevronDown, Construction, X, ExternalLink } from "lucide-react";

/* Tự chia đều sản phẩm vào 2 vòng */
const mid = Math.ceil(products.length / 2);
const innerOrbit = products.slice(0, mid);
const outerOrbit = products.slice(mid);

/* ── Icon helper ── */
function PIcon({ name, size = 24 }: { name: string; size?: number }) {
  return <ProductIcon name={name} width={size} height={size} />;
}

/* ── Product link wrapper ── */
function ProductLink({
  product,
  onComingSoon,
  className,
  children,
}: {
  product: Product;
  onComingSoon: (label: string) => void;
  className?: string;
  children: React.ReactNode;
}) {
  if (product.comingSoon) {
    return (
      <button
        type="button"
        onClick={() => onComingSoon(product.label)}
        className={className}
      >
        {children}
      </button>
    );
  }
  return (
    <a href={product.url} className={className}>
      {children}
    </a>
  );
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
          /* Fan chỉ nửa trên: từ -160° đến -20° */
          const arc = 140;
          const startAngle = -160;
          const angle =
            childCount > 1 ? startAngle + (arc / (childCount - 1)) * i : -90;
          const rad = (angle * Math.PI) / 180;
          const r = 85;
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
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800/90 border border-slate-600/50 text-white shadow-md backdrop-blur-sm">
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
          <div className="sidebar-panel flex h-full flex-col border-l border-slate-700/50 bg-[#0c1222]/98 backdrop-blur-2xl shadow-2xl shadow-black/60">
            {/* ── Header (pinned) ── */}
            <div className="shrink-0 border-b border-slate-700/40 p-5 pb-5">
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng"
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 border border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
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
                <div className="rounded-2xl bg-slate-800/40 border border-slate-700/30 p-4">
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
                          className="flex items-center gap-3 rounded-xl bg-slate-800/30 border border-slate-700/25 px-4 py-3 transition-colors hover:bg-slate-800/50"
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
            <div className="shrink-0 border-t border-slate-700/40 bg-[#0c1222] p-5">
              {product.comingSoon ? (
                <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-800/60 border border-slate-700/30 py-3.5 text-sm font-semibold text-slate-500">
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

/* ── Toast component ── */
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      className={`toast-container fixed top-6 right-6 z-50 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}
    >
      <div className="flex items-center gap-3 rounded-2xl bg-slate-800 border border-slate-700 px-5 py-3 text-sm text-white shadow-xl">
        <Construction
          width={16}
          height={16}
          className="text-amber-400 shrink-0"
        />
        <span>{message}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [introReady, setIntroReady] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Đợi 1 tick sau mount rồi mới bật animation
    const t = setTimeout(() => setIntroReady(true), 100);
    return () => clearTimeout(t);
  }, []);

  const showToast = useCallback((label: string) => {
    setToast({
      visible: true,
      message: `${label} đang được phát triển, sắp ra mắt!`,
    });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  }, []);

  return (
    <div className="flex flex-col">
      {/* ════════ HERO ════════ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-x-clip">
        {/* BG layers */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/images/bg-space.jpg"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="hero-backdrop" />
          <div className="stars" />
          <div className="hero-blob-1" />
          <div className="hero-blob-2" />
          <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-b from-transparent to-[#0a0e1a]" />
        </div>

        {/* ── Desktop: Orbit layout ── */}
        <div className="relative z-10 hidden lg:flex h-[820px] w-[820px] items-center justify-center">
          {/* Decorative orbit rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="orbit-ring absolute w-[440px] h-[440px] rounded-full border border-dashed border-emerald-500/10" />
            <div className="orbit-ring absolute w-[760px] h-[760px] rounded-full border border-dashed border-slate-500/8" />
            <div className="orbit-ring-reverse absolute w-[600px] h-[600px] rounded-full border border-dotted border-emerald-400/6" />
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

      {/* ════════ BANNER SẢN PHẨM — nhấp nhô ════════ */}
      <section className="overflow-hidden py-16 sm:py-24 section-glow-top">
        <div className="flex gap-4 sm:gap-5 px-6 items-start justify-center">
          {products.map((p, i) => (
            <ProductLink
              key={p.key}
              product={p}
              onComingSoon={showToast}
              className={`group relative flex-none w-40 sm:w-48 rounded-3xl overflow-hidden shadow-lg shadow-black/30 hover:shadow-2xl hover:shadow-emerald-500/10 hover:scale-105 transition-all duration-300 ${i % 2 !== 0 ? "translate-y-10 sm:translate-y-14" : ""}`}
            >
              <div className="aspect-[3/4] relative bg-slate-800">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-80`}
                />
                {/* Label */}
                <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8">
                  <span className="text-sm font-bold text-white tracking-tight">
                    {p.label}
                  </span>
                  {p.comingSoon && (
                    <span className="ml-2 inline-flex rounded-full bg-white/15 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold text-white/80 align-middle">
                      Sắp ra mắt
                    </span>
                  )}
                </div>
              </div>
            </ProductLink>
          ))}
        </div>
      </section>

      {/* ════════ GIỚI THIỆU ════════ */}
      <section className="relative flex justify-center px-6 py-28 sm:py-36 section-glow-top overflow-x-clip">
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large spotlight glow */}
          <div className="intro-spotlight" />
          {/* Floating blobs */}
          <div className="intro-blob-1" />
          <div className="intro-blob-2" />
          <div className="intro-blob-3" />
          {/* Rotating rings */}
          <div className="absolute top-16 right-[12%] w-72 h-72 rounded-full border border-dashed border-emerald-500/[0.12] intro-ring" />
          <div className="absolute bottom-24 left-[8%] w-48 h-48 rounded-full border border-dotted border-teal-400/[0.10] intro-ring-reverse" />
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] rounded-full border border-dashed border-emerald-400/[0.06] intro-ring" />
          {/* Accent streaks */}
          <div className="intro-streak intro-streak-1" />
          <div className="intro-streak intro-streak-2" />
          {/* Scattered particles */}
          <div className="intro-particles" />
        </div>

        <div className="relative z-10 w-full max-w-7xl">
          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
            {/* Sidebar nav */}
            <nav className="sm:w-64 shrink-0 sm:sticky sm:top-8 sm:self-start">
              <div className="rounded-2xl border border-slate-700/50 bg-slate-800 p-6">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-400/70 mb-2">
                  <span className="h-px w-4 bg-emerald-500/40" />
                  Tổng quan
                </span>
                <h2 className="text-lg font-extrabold tracking-tight text-white mb-5">
                  Giới thiệu về Operis
                </h2>

                {/* TOC items with vertical line */}
                <div className="relative ml-1.5">
                  <div className="absolute left-[5px] top-2 bottom-2 w-px bg-slate-700/60" />
                  <ul className="flex flex-col gap-1">
                    {[
                      {
                        href: "#operis-la-gi",
                        id: "operis-la-gi",
                        label: "Operis là gì?",
                        num: "01",
                      },
                      {
                        href: "#dac-diem",
                        id: "dac-diem",
                        label: "Đặc điểm nổi bật",
                        num: "02",
                      },
                      { href: "#san-pham", id: "san-pham", label: "Các sản phẩm", num: "03" },
                    ].map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className="group relative flex items-center gap-3 rounded-lg py-3 pl-6 pr-3 text-[15px] text-slate-300 transition-all hover:text-emerald-400 hover:bg-emerald-500/5"
                        >
                          <span className="absolute left-0 h-3 w-3 rounded-full border-2 border-slate-700 bg-[#0a0e1a] transition-colors group-hover:border-emerald-500 group-hover:bg-emerald-500/20" />
                          <span className="text-xs font-bold text-slate-500 tabular-nums transition-colors group-hover:text-emerald-500">
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
              {/* I. Operis là gì */}
              <div id="operis-la-gi">
                <h3 className="text-2xl font-extrabold tracking-tight text-white mb-4">
                  I. Operis là gì?
                </h3>
                <div className="space-y-4 text-base leading-relaxed text-slate-300">
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

              {/* II. Đặc điểm */}
              <div id="dac-diem">
                <h3 className="text-2xl font-extrabold tracking-tight text-white mb-6">
                  II. Đặc điểm nổi bật
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      title: "Độc lập nhưng thống nhất",
                      desc: "Mỗi sản phẩm hoạt động riêng lẻ hoàn chỉnh. Không phụ thuộc, không bắt buộc dùng cả hệ sinh thái.",
                      icon: "Box",
                    },
                    {
                      title: "Kết nối liền mạch",
                      desc: "Khi dùng nhiều sản phẩm cùng lúc, dữ liệu và trải nghiệm được đồng bộ tự động giữa các công cụ.",
                      icon: "ArrowRight",
                    },
                    {
                      title: "Thiết kế cho hiệu suất",
                      desc: "Giao diện tối giản, tốc độ nhanh, tập trung vào việc giúp người dùng hoàn thành công việc nhanh nhất.",
                      icon: "Zap",
                    },
                  ].map((f) => (
                    <div
                      key={f.title}
                      className="rounded-2xl border border-slate-700/50 bg-slate-800 p-5 transition-colors hover:border-emerald-500/20 hover:bg-slate-700/80"
                    >
                      <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                        <PIcon name={f.icon} size={18} />
                      </span>
                      <h4 className="text-base font-bold text-slate-200 mb-2">
                        {f.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-slate-300">
                        {f.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* III. Sản phẩm */}
              <div id="san-pham">
                <h3 className="text-2xl font-extrabold tracking-tight text-white mb-6">
                  III. Các sản phẩm
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {products.map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setSelectedProduct(p)}
                      className="group flex items-start gap-4 rounded-2xl border border-slate-700/50 bg-slate-800 p-4 text-left transition-all hover:border-emerald-500/20 hover:bg-slate-700/80"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${p.gradient} text-white shadow-sm ${p.comingSoon ? "opacity-60" : ""}`}
                      >
                        <PIcon name={p.icon} />
                      </span>
                      <div className="min-w-0">
                        <span className="flex items-center gap-2">
                          <span className="text-base font-bold text-slate-200 group-hover:text-white transition-colors">
                            {p.label}
                          </span>
                          {p.comingSoon && (
                            <span className="rounded-full bg-amber-500/15 border border-amber-400/30 px-1.5 py-0.5 text-[9px] font-bold text-amber-400 leading-none">
                              Soon
                            </span>
                          )}
                        </span>
                        <p className="mt-1 text-sm leading-relaxed text-slate-300 line-clamp-2">
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

      {/* ════════ FOOTER ════════ */}
      <footer className="relative px-6 pt-24 pb-12 overflow-hidden">
        {/* Decorative top border */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

        {/* Background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-emerald-500/[0.04] blur-[100px] pointer-events-none" />

        <div className="relative mx-auto w-full max-w-7xl">
          {/* Main grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-10 sm:gap-8 mb-16">
            {/* Brand — wider */}
            <div className="sm:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/20">
                  <PIcon name="Boxes" size={20} />
                </span>
                <span className="text-2xl font-black tracking-tighter text-white">
                  operis
                </span>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-slate-400">
                Hệ sinh thái công cụ số — mỗi sản phẩm một sứ mệnh, kết hợp
                thành sức mạnh toàn diện cho doanh nghiệp.
              </p>
              {/* Social / product icons row */}
              <div className="flex gap-1.5 mt-1">
                {products.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => setSelectedProduct(p)}
                    aria-label={p.label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 border border-slate-700/50 text-slate-400 transition-all hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-slate-700/80"
                  >
                    <PIcon name={p.icon} size={14} />
                  </button>
                ))}
              </div>
            </div>

            {/* Product links */}
            <div className="sm:col-span-4 flex flex-col gap-2.5">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                Sản phẩm
              </span>
              {products.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setSelectedProduct(p)}
                  className="group flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-emerald-400"
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${p.gradient} text-white/90 shadow-sm`}
                  >
                    <PIcon name={p.icon} size={13} />
                  </span>
                  <span className="font-medium">{p.label}</span>
                  {p.comingSoon && (
                    <span className="rounded-full bg-amber-500/15 border border-amber-400/30 px-1.5 py-0.5 text-[8px] font-bold text-amber-400 leading-none">
                      Soon
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Legal links */}
            <div className="sm:col-span-3 flex flex-col gap-2.5">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
                Liên kết
              </span>
              {[
                { label: "Chính sách bảo mật", href: "#" },
                { label: "Điều khoản sử dụng", href: "#" },
                { label: "Liên hệ", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-400 transition-colors hover:text-emerald-400"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/60 to-transparent mb-6" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[13px] text-slate-500">
            <p>&copy; {new Date().getFullYear()} Operis. Bảo lưu mọi quyền.</p>
            <p className="text-slate-600">
              Thiết kế và phát triển bởi <span className="text-slate-400 font-semibold">Operis Team</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Product Sidebar */}
      <ProductSidebar
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Toast */}
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
