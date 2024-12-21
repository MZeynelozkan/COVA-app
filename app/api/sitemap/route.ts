import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://www.cova-app.com.tr"; // Kendi sitenizin URL'sini yazın.

  // Statik sayfa yolları
  const staticPaths = [
    "/",
    "/auth/sign-in",
    "/home",
    "/admin",
    "/art-collections",
    "/collection",
    "/create",
    "/popular-products",
    "/profile",
    "/top-artists",
    "/video",
  ];

  // Site haritası XML'i oluşturuluyor
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPaths
    .map((path) => {
      return `
    <url>
      <loc>${baseUrl}${path}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
    })
    .join("")}
</urlset>`;

  // Response döndür
  return new NextResponse(sitemap.trim(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
