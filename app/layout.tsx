import type { Metadata } from "next";
// eslint-disable-next-line camelcase, import/order
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import "@/styles/theme.css";
import { SessionProvider } from "next-auth/react";

import AdSense from "@/components/adsense/AdSense";
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
      <head>
        <AdSense pId="pub-4289366483169589" />
      </head>
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
