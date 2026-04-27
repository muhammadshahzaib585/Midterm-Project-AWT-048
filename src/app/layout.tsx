import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "AdFlow Pro",
  description: "AdFlow Pro is a premium, moderated ad marketplace where quality meets visibility. Get your business seen by thousands through our sponsored listings platform.",
  keywords: "ad marketplace, sponsored listings, business advertising, premium ads",
  authors: [{ name: "AdFlow Pro" }],
  openGraph: {
    title: "AdFlow Pro | Premium Ad Marketplace",
    description: "Premium moderated ad marketplace for serious businesses.",
    type: "website",
  },
};

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-200 antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
