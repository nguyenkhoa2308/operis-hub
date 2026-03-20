import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Operis — Hệ sinh thái công cụ số",
  description:
    "Operis là hệ sinh thái sản phẩm số. Mỗi công cụ hoạt động độc lập nhưng kết nối liền mạch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${nunito.variable} antialiased`}>
      <body className="min-h-screen font-sans text-slate-200 bg-[#0a0e1a]">
        {children}
      </body>
    </html>
  );
}
