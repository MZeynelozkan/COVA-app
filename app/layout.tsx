import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import "@/styles/theme.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Collectify",
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
      <body className={plusJakartaSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
