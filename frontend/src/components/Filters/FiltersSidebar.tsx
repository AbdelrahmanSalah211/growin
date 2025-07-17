"use client";

import React from "react";
import Ratings from "./Rating";
import Categories from "./Categories";
import Levels from "./Levels";
import Price from "./Price";

interface FiltersSidebarProps {
  isSidebarOpen: boolean;
  changeSidebarOpen: (tof: boolean) => void;
  resetFilters: () => void;
  rating: number;
  changeRating: (e: React.ChangeEvent<HTMLInputElement>) => void;
  categories: string[];
  selectedCategory: string;
  changeCategory: (e: React.ChangeEvent<HTMLInputElement>) => void;
  levels: { [key: string]: boolean };
  changeLevels: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minValue: number;
  maxValue: number;
  min: number;
  max: number;
  handleMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FiltersSidebar({
  isSidebarOpen,
  changeSidebarOpen,
  resetFilters,
  rating,
  changeRating,
  categories,
  selectedCategory,
  changeCategory,
  levels,
  changeLevels,
  minValue,
  maxValue,
  min,
  max,
  handleMinChange,
  handleMaxChange,
}: FiltersSidebarProps) {
  return (
    <div className="drawer drawer-end">
      <input
        id="filter-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isSidebarOpen}
        onChange={(e) => changeSidebarOpen(e.target.checked)}
      />
      <div className="drawer-side z-50">
        <label
          htmlFor="filter-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu bg-white text-base-content min-h-full w-[25rem] p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-extrabold text-primary-text text-3xl">
                Filters
              </h1>
              <span
                className="cursor-pointer text-sm text-secondary-text"
                onClick={resetFilters}
              >
                ✕ Clear all filters
              </span>
            </div>
            <label
              htmlFor="filter-drawer"
              className="text-2xl text-secondary-text hover:text-primary-text transition cursor-pointer"
            >
              ✕
            </label>
          </div>
          <div className="flex-1 overflow-y-auto flex flex-col gap-6">
            <Ratings value={rating} onChange={changeRating} />
            <Categories
              categories={categories}
              selectedCategory={selectedCategory}
              onChange={changeCategory}
            />
            <Levels values={levels} onChange={changeLevels} />
            <Price
              minValue={minValue}
              maxValue={maxValue}
              min={min}
              max={max}
              onMinChange={handleMinChange}
              onMaxChange={handleMaxChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
