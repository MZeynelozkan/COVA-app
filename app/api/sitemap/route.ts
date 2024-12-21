import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://your-website.com"; // Kendi sitenizin URL'sini buraya yazın.

  // Statik sayfaların URL'leri
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

  // Site haritası XML şablonu
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPaths
        .map((path) => {
          return `
            <url>
              <loc>${baseUrl}${path}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  // Response döndür
  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
