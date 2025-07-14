"use client";

import FiltersSidebar from "@/components/Filters/FiltersSidebar";
import SearchPage from "@/components/searchPage/SearchPage";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";
import React from "react";

export default function Page() {
useHydrateAuth();
  return (
    <>

    <div className="bg-background">

      <SearchPage/>

    </div>
    </>
  );
}
