import { NextResponse } from "next/server";

import { prisma } from "@/prisma";

export async function GET() {
  const baseUrl = "https://www.cova-app.com.tr"; // Sitenizin URL'sini yazın.

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

  // Dinamik verileri al
  const collections = await prisma.collection.findMany({
    select: { id: true },
  });

  const profiles = await prisma.user.findMany({
    select: { id: true, updatedAt: true },
  });

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
  ${collections
    .map((collection) => {
      return `
    <url>
      <loc>${baseUrl}/collection/${collection.id}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`;
    })
    .join("")}
  ${profiles
    .map((profile) => {
      return `
    <url>
      <loc>${baseUrl}/profile/${profile.id}</loc>
      <lastmod>${profile.updatedAt.toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
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
