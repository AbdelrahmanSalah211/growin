"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import SearchInput from "../ui/inputs/SearchInput";

export default function SearchForm() {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();
    search && params.set("title", search);
    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <SearchInput value={search} onChange={handleSearch} />
    </form>
  );
}
