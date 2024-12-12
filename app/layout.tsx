import type { Metadata } from "next";
// eslint-disable-next-line camelcase, import/order
import { Plus_Jakarta_Sans } from "next/font/google";

// eslint-disable-next-line import/order
import Head from "next/head"; // next/head bileşenini içe aktarın

import "./globals.css";
import "@/styles/theme.css";
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
      <Head>
        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4289366483169589"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <body className={plusJakartaSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
