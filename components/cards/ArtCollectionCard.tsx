import Link from "next/link";
import React from "react";

// Props için interface tanımı
interface ArtCollectionCardProps {
  title: string; // Kart başlığı

  savingCount: number; // Kaydetme sayısı
  artCount: number; // Sanat eseri sayısı
  specification: string; // Özellikler
  id: string; // Sayfa yönlendirmesi için ID
}

// Bileşen
const ArtCollectionCard: React.FC<ArtCollectionCardProps> = ({
  title,

  savingCount,
  artCount,
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
        Saving Count: {savingCount} | Number of Arts: {artCount} |
        Specification: {specification}
      </p>
    </Link>
  );
};

export default ArtCollectionCard;
