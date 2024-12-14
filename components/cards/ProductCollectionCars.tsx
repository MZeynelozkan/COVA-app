import React from "react";

// Props için interface tanımı
interface ProductCollectionCardsProps {
  title: string; // Kart başlığı
  savingCount: number; // Kaydetme sayısı
  productCount: number; // Ürün sayısı
  specification: string; // Ürün özellikleri
}

// Bileşen
const ProductCollectionCards: React.FC<ProductCollectionCardsProps> = ({
  title,
  savingCount,
  productCount,
  specification,
}) => {
  return (
    <div className="flex w-full flex-col gap-4 border p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>
        Saving Count: {savingCount} | Number of Products: {productCount} |
        Specification: {specification}
      </p>
    </div>
  );
};

export default ProductCollectionCards;
