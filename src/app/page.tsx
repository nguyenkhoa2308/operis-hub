import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { planetConfig } from "./_components/constants";
import { MSIcon } from "./_components/MSIcon";
import { ProductSidebarProvider } from "./_components/ProductSidebarProvider";
import { Navbar } from "./_components/Navbar";
import { TocSidebar } from "./_components/TocSidebar";
import { HeroOrbitSystem } from "./_components/HeroOrbitSystem";
import { ProductCardWrapper } from "./_components/ProductCardWrapper";
import { ChatBot } from "./_components/ChatBot";
import { ScrollToTop } from "./_components/ScrollToTop";
import { ZaloFloat } from "./_components/ZaloFloat";

export default function HomePage() {
  const allProducts = products.filter((p) => planetConfig[p.key]);
  const modelsIdx = allProducts.findIndex((p) => p.key === "models");
  const gridProducts =
    modelsIdx > 0
      ? [
          allProducts[modelsIdx],
          ...allProducts.filter((_, i) => i !== modelsIdx),
        ]
      : allProducts;
  const row1 = gridProducts.slice(0, 2);
  const row2 = gridProducts.slice(2);

  return (
    <ProductSidebarProvider>
      <div className="font-body selection:bg-[#a1ffc2]/30 selection:text-[#a1ffc2]">
        <div className="op-cosmic-overlay" />
        <div className="op-animated-grid" />

        <Navbar />
        <HeroOrbitSystem />

        {/* ════════ PRODUCT GALLERY ════════ */}
        <section
          id="products"
          className="relative py-28 bg-gradient-to-b from-black via-[#000d0e] to-black px-8 op-section-transition"
        >
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#a1ffc2] rounded-full blur-[2px] animate-pulse" />
            <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-[#00e3fd] rounded-full blur-[1px] animate-ping" />
            <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-[#ac89ff] rounded-full blur-[4px] opacity-40" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-16">
              <h2 className="font-headline text-5xl font-bold tracking-tight text-white mb-4">
                Hệ sinh thái Operis
              </h2>
              <div className="w-24 h-1 bg-[#a1ffc2] shadow-[0_0_10px_rgba(161,255,194,0.6)]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {row1[0] && (
                <ProductCardWrapper product={row1[0]} span="large">
                  <span
                    className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded mb-4 border"
                    style={{
                      background: `${planetConfig[row1[0].key]?.color}20`,
                      color: planetConfig[row1[0].key]?.color,
                      borderColor: `${planetConfig[row1[0].key]?.color}30`,
                    }}
                  >
                    {row1[0].label}
                  </span>
                  <h3 className="font-headline text-3xl font-bold text-white mb-2">
                    {row1[0].label}
                  </h3>
                  <p className="text-[#adaaaa] group-hover:text-white transition-colors max-w-md">
                    {row1[0].desc}
                  </p>
                </ProductCardWrapper>
              )}
              {row1[1] && (
                <ProductCardWrapper product={row1[1]} span="small">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline text-xl font-bold text-white">
                      {row1[1].label}
                    </h3>
                    {row1[1].comingSoon && (
                      <span className="text-[9px] font-bold text-amber-400 bg-amber-500/15 border border-amber-400/30 px-2 py-0.5 rounded-full">
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-[#adaaaa] group-hover:text-white transition-colors text-sm mt-2">
                    {row1[1].desc}
                  </p>
                </ProductCardWrapper>
              )}
              {row2.length === 2 ? (
                <>
                  <ProductCardWrapper product={row2[0]} span="small">
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline text-xl font-bold text-white">
                        {row2[0].label}
                      </h3>
                      {row2[0].comingSoon && (
                        <span className="text-[9px] font-bold text-amber-400 bg-amber-500/15 border border-amber-400/30 px-2 py-0.5 rounded-full">
                          Soon
                        </span>
                      )}
                    </div>
                    <p className="text-[#adaaaa] group-hover:text-white transition-colors text-sm mt-2">
                      {row2[0].desc}
                    </p>
                  </ProductCardWrapper>
                  <ProductCardWrapper product={row2[1]} span="large">
                    <span
                      className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded mb-4 border"
                      style={{
                        background: `${planetConfig[row2[1].key]?.color}20`,
                        color: planetConfig[row2[1].key]?.color,
                        borderColor: `${planetConfig[row2[1].key]?.color}30`,
                      }}
                    >
                      {row2[1].label}
                    </span>
                    <h3 className="font-headline text-3xl font-bold text-white mb-2">
                      {row2[1].label}
                    </h3>
                    <p className="text-[#adaaaa] group-hover:text-white transition-colors max-w-md">
                      {row2[1].desc}
                    </p>
                  </ProductCardWrapper>
                </>
              ) : (
                row2.map((p) => (
                  <ProductCardWrapper key={p.key} product={p} span="small">
                    <div className="flex items-center gap-2">
                      <h3 className="font-headline text-xl font-bold text-white">
                        {p.label}
                      </h3>
                      {p.comingSoon && (
                        <span className="text-[9px] font-bold text-amber-400 bg-amber-500/15 border border-amber-400/30 px-2 py-0.5 rounded-full">
                          Soon
                        </span>
                      )}
                    </div>
                    <p className="text-[#adaaaa] group-hover:text-white transition-colors text-sm mt-2">
                      {p.desc}
                    </p>
                  </ProductCardWrapper>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ════════ DETAILED INFO ════════ */}
        <section
          id="about"
          className="relative py-24 bg-gradient-to-b from-black to-[#040404] border-t border-white/5"
        >
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row gap-20">
            <TocSidebar />

            <main className="md:w-3/4 space-y-16">
              <article className="space-y-6" id="section-1">
                <div className="inline-block px-3 py-1 bg-[#a1ffc2]/10 border border-[#a1ffc2]/20 text-[#a1ffc2] text-sm font-black tracking-widest uppercase rounded">
                  01 — Giới thiệu
                </div>
                <h2 className="font-headline text-4xl font-bold leading-tight text-white">
                  Operis là gì?
                </h2>
                <p className="text-[#adaaaa] text-lg leading-relaxed">
                  Operis là nền tảng tổng hợp, nơi tập trung toàn bộ các sản
                  phẩm và dịch vụ vào một giao diện duy nhất. Từ đây bạn có thể
                  truy cập nhanh vào bất kỳ nền tảng nào trong hệ sinh thái.
                </p>
              </article>

              <article className="space-y-6" id="section-tech">
                <div className="inline-block px-3 py-1 bg-[#00e3fd]/10 border border-[#00e3fd]/20 text-[#00e3fd] text-sm font-black tracking-widest uppercase rounded">
                  02 — Công nghệ
                </div>
                <p className="text-[#adaaaa] leading-relaxed">
                  Các sản phẩm Operis được xây dựng trên nền tảng công nghệ hiện
                  đại, tập trung vào tốc độ và trải nghiệm người dùng.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      name: "Next.js",
                      desc: "React framework",
                      color: "#a1ffc2",
                    },
                    {
                      name: "TypeScript",
                      desc: "Type-safe code",
                      color: "#00e3fd",
                    },
                    {
                      name: "Tailwind CSS",
                      desc: "Utility-first styling",
                      color: "#ac89ff",
                    },
                    {
                      name: "AI APIs",
                      desc: "GPT, Claude, Gemini",
                      color: "#a1ffc2",
                    },
                    { name: "Python", desc: "Backend", color: "#00e3fd" },
                    { name: "PostgreSQL", desc: "Database", color: "#ac89ff" },
                    { name: "Redis", desc: "Caching", color: "#a1ffc2" },
                    {
                      name: "Cloudflare",
                      desc: "CDN & Security",
                      color: "#00e3fd",
                    },
                  ].map((t) => (
                    <div
                      key={t.name}
                      className="p-4 rounded-xl op-glass-card border border-white/5 group hover:border-white/10 transition-all"
                    >
                      <p className="font-headline text-sm font-bold text-white">
                        {t.name}
                      </p>
                      <p className="text-xs text-[#adaaaa] mt-1">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="space-y-6" id="section-team">
                <div className="inline-block px-3 py-1 bg-[#ac89ff]/10 border border-[#ac89ff]/20 text-[#ac89ff] text-sm font-black tracking-widest uppercase rounded">
                  03 — Đội ngũ
                </div>
                <p className="text-[#adaaaa] leading-relaxed">
                  Operis được phát triển bởi một nhóm nhỏ các bạn trẻ yêu công
                  nghệ, đam mê xây dựng sản phẩm và luôn tìm cách ứng dụng AI
                  vào công việc thực tế.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "Hùng Lê", role: "Founder & CEO", icon: "person" },
                    {
                      name: "AI Assistants",
                      role: "Claude, GPT, Gemini",
                      icon: "smart_toy",
                    },
                    {
                      name: "Bạn?",
                      role: "Đang tuyển cộng tác viên",
                      icon: "person_add",
                    },
                  ].map((m) => (
                    <div
                      key={m.name}
                      className="p-6 rounded-xl op-glass-card border border-white/5 flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#a1ffc2]/10 border border-[#a1ffc2]/20 flex items-center justify-center shrink-0">
                        <MSIcon
                          name={m.icon}
                          style={{ fontSize: "20px", color: "#a1ffc2" }}
                        />
                      </div>
                      <div>
                        <p className="font-headline text-sm font-bold text-white">
                          {m.name}
                        </p>
                        <p className="text-xs text-[#adaaaa]">{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              <article className="space-y-6" id="section-faq">
                <div className="inline-block px-3 py-1 bg-[#a1ffc2]/10 border border-[#a1ffc2]/20 text-[#a1ffc2] text-sm font-black tracking-widest uppercase rounded">
                  04 — FAQ
                </div>
                <div className="space-y-4">
                  {[
                    {
                      q: "Operis có miễn phí không?",
                      a: "Có. Đây là trang tổng hợp link, bạn truy cập tự do. Các sản phẩm con có thể có gói miễn phí và trả phí tùy từng dịch vụ.",
                    },
                    {
                      q: "Cần đăng nhập để sử dụng không?",
                      a: "Không cần đăng nhập để xem trang này. Tùy từng sản phẩm sẽ yêu cầu tài khoản riêng.",
                    },
                    {
                      q: 'Sản phẩm gắn "Soon" nghĩa là gì?',
                      a: "Đang trong giai đoạn phát triển, chưa ra mắt chính thức. Bạn có thể theo dõi tiến độ tại đây.",
                    },
                    {
                      q: "Làm sao để đóng góp hoặc tham gia?",
                      a: "Liên hệ qua Zalo hoặc email bên dưới. Chúng mình luôn chào đón người mới!",
                    },
                  ].map((item) => (
                    <div
                      key={item.q}
                      className="p-5 rounded-xl op-glass-card border border-white/5"
                    >
                      <p className="font-headline text-sm font-bold text-white mb-2">
                        {item.q}
                      </p>
                      <p className="text-sm text-[#adaaaa] leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </article>

              <article className="space-y-6" id="section-contact">
                <div className="inline-block px-3 py-1 bg-[#00e3fd]/10 border border-[#00e3fd]/20 text-[#00e3fd] text-sm font-black tracking-widest uppercase rounded">
                  05 — Liên hệ
                </div>
                <p className="text-[#adaaaa] leading-relaxed">
                  Bạn cần hỗ trợ, tư vấn hoặc muốn hợp tác? Liên hệ với chúng
                  mình qua các kênh bên dưới.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="https://zalo.me/0853336668"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-5 rounded-xl op-glass-card border border-white/5 hover:border-[#0068ff]/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#0068ff]/10 border border-[#0068ff]/20 flex items-center justify-center shrink-0">
                      <Image
                        src="/icons/zalo_icon.svg"
                        alt="Zalo"
                        width={22}
                        height={22}
                      />
                    </div>
                    <div>
                      <p className="font-headline text-sm font-bold text-white group-hover:text-[#0068ff] transition-colors">
                        Zalo
                      </p>
                      <p className="text-sm text-[#adaaaa]">0853 336 668</p>
                    </div>
                    <MSIcon
                      name="north_east"
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#0068ff]"
                      style={{ fontSize: "18px" }}
                    />
                  </Link>
                  <Link
                    href="mailto:hungle@hagency.vn"
                    className="group flex items-center gap-4 p-5 rounded-xl op-glass-card border border-white/5 hover:border-[#a1ffc2]/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#a1ffc2]/10 border border-[#a1ffc2]/20 flex items-center justify-center shrink-0">
                      <MSIcon
                        name="mail"
                        style={{ fontSize: "20px", color: "#a1ffc2" }}
                      />
                    </div>
                    <div>
                      <p className="font-headline text-sm font-bold text-white group-hover:text-[#a1ffc2] transition-colors">
                        Email
                      </p>
                      <p className="text-sm text-[#adaaaa]">
                        hungle@hagency.vn
                      </p>
                    </div>
                    <MSIcon
                      name="north_east"
                      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#a1ffc2]"
                      style={{ fontSize: "18px" }}
                    />
                  </Link>
                </div>
                <ChatBot />
              </article>
            </main>
          </div>
        </section>

        {/* ════════ FOOTER ════════ */}
        <footer className="bg-black w-full py-16 border-t border-[#a1ffc2]/10 relative overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-[#a1ffc2]/10 blur-[100px] pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-8 relative z-10">
            <div className="mb-8 md:mb-0">
              <Link href="/" className="flex items-center group">
                <Image
                  src="/images/logo.png"
                  alt="Operis logo"
                  width={40}
                  height={40}
                  className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(89%) sepia(20%) saturate(500%) hue-rotate(82deg) brightness(103%) contrast(98%) drop-shadow(0 0 12px rgba(161,255,194,1)) drop-shadow(0 0 30px rgba(161,255,194,0.7)) drop-shadow(0 0 60px rgba(161,255,194,0.4))",
                  }}
                />
                <span className="text-2xl font-black text-[#a1ffc2] font-headline uppercase tracking-widest op-text-glow -ml-1">
                  peris
                </span>
              </Link>
              <p className="font-body text-xs text-slate-500 mt-3">
                &copy; 2025 Operis. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-10">
              {[
                { label: "Zalo", href: "https://zalo.me/0853336668" },
                { label: "Email", href: "mailto:hungle@hagency.vn" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  className="font-body text-xs text-slate-500 hover:text-[#a1ffc2] transition-all duration-300 uppercase tracking-widest"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>

        <ScrollToTop />
        <ZaloFloat />
      </div>
    </ProductSidebarProvider>
  );
}
