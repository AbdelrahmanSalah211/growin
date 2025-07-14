"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    <>
      {!isSidebarOpen && (
        <button
          onClick={() => changeSidebarOpen(true)}
          className="flex items-center gap-[0.3125rem] bg-surface w-[11.875rem] h-[4.375rem] px-[2rem] py-[1.1875rem] rounded-[3.75rem] shadow-sm cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-6"
          >
            <path
              d="M12 17H19M5 12H19M5 7H19"
              stroke="#2C3E50"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-[1.25rem] text-primary-text font-bold">
            All Filters
          </span>
        </button>
      )}

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 h-full z-50 bg-white shadow-lg flex flex-col w-[25rem]"
          >
            {/* Header */}
            <div className="flex justify-between p-6">
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
              <button
                onClick={() => changeSidebarOpen(false)}
                className="text-2xl text-secondary-text hover:text-primary-text transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Filters */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
