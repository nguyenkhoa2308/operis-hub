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
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${nunito.variable} antialiased`}>
      <head>
        <link rel="preload" as="image" href="/images/bg-space.jpg" />
      </head>
      <body className="min-h-screen font-sans text-slate-200 bg-[#0d0d0d]">
        {children}
      </body>
    </html>
  );
}
