import Link from "next/link";
import React from "react";

// Props için interface tanımı
interface ProductCollectionCardsProps {
  title: string; // Kart başlığı
  savingCount: number; // Kaydetme sayısı
  productCount: number; // Ürün sayısı
  specification: string; // Ürün özellikleri
  id: string;
}

// Bileşen
const ProductCollectionCards: React.FC<ProductCollectionCardsProps> = ({
  title,
  savingCount,
  productCount,
  specification,
  id,
}) => {
  return (
    <Link
      href={`/collection/${id}`}
      className="flex w-full flex-col gap-4 border p-4"
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p>
        Saving Count: {savingCount} | Number of Products: {productCount} |
        Specification: {specification}
      </p>
    </Link>
  );
};

export default ProductCollectionCards;
