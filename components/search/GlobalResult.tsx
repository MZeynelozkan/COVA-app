"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { globalSearch } from "@/lib/actions/global.action";

const GlobalResult = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState<string | null>(null);

  const global = searchParams.get("q");

  useEffect(() => {
    setQuery(global);

    if (!global) {
      setResult([]);
      return;
    }

    const fetchResult = async () => {
      setIsLoading(true);
      setResult([]);

      try {
        const res = await globalSearch({ query: global });
        const parsedResult = JSON.parse(res);
        console.log(parsedResult);

        setResult(parsedResult);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [global]);

  const renderLink = (type: string, id: string | number) => {
    switch (type) {
      case "collection":
        return `/collection/${id}`;
      case "user":
        return `/profile/${id}`;
      default:
        return "/";
    }
  };

  const renderIcon = (type: string) => {
    switch (type) {
      case "collection":
        return <span className="mr-2 text-blue-500">📚</span>; // Koleksiyon için bir kitap ikonu
      case "user":
        return <span className="mr-2 text-green-500">👤</span>; // Kullanıcı için bir profil ikonu
      default:
        return null;
    }
  };

  if (!query) {
    return null;
  }

  return (
    <div className="absolute top-full z-50 mt-3 w-full rounded-xl bg-white shadow-lg">
      {isLoading ? (
        <p className="p-4 text-center text-gray-500">Loading...</p>
      ) : result.length > 0 ? (
        result.map((item: any) => (
          <div key={item.id} className="border-b last:border-none">
            <Link
              href={renderLink(item.type, item.id.toString())}
              className="flex items-center rounded-md px-4 py-3 text-gray-800 transition duration-200 ease-in-out hover:bg-gray-100 hover:text-blue-600"
            >
              {renderIcon(item.type)}
              {item.name}
            </Link>
          </div>
        ))
      ) : (
        <p className="p-4 text-center text-gray-500">No results found</p>
      )}
    </div>
  );
};

export default GlobalResult;
