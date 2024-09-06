"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("searchQuery") || "");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set("searchQuery", searchQuery);
    } else {
      params.delete("searchQuery");
    }

    const query = params.toString() ? `?${params.toString()}` : "";
    router.push(`/tickets${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search tickets..."
        className="border rounded p-2"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
