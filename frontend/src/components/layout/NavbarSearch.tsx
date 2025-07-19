"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState, useEffect } from "react";
import SearchInput from "@/components/ui/inputs/SearchInput";

export default function NavbarSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = () => {
    const trimmed = search.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  useEffect(() => {
    const q = searchParams.get("q");
    if (!q) setSearch("");
  }, [searchParams]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="w-full flex justify-center"
    >
      <SearchInput
        value={search}
        onChange={handleChange}
        inputProps={{ onKeyDown: handleKeyDown }}
      />
    </form>
  );
}
