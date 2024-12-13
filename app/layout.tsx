import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
// eslint-disable-next-line camelcase, import/order
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import "@/styles/theme.css";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@/components/theme/theme-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "COVA",
  description: "Sanat, müzik ve ürün koleksiyonlarını keşfedin",
  keywords: "sanat, müzik, koleksiyonlar, puanlama, keşfet, etkileşim, içerik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <body className={plusJakartaSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
            <SpeedInsights />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
