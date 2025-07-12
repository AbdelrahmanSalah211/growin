"use client";

import Levels from "@/components/Filters/Levels";
import Price from "@/components/Filters/Price";
import Ratings from "@/components/Filters/Rating";
import Topics from "@/components/Filters/Topics";
import React, { ChangeEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function FiltersSidebar() {
  // Rating filter
  const [rating, setRating] = useState(0);
  const changeRating = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(+e.target.value);
  };

  // Topics filter
  const [topics, setTopics] = useState({
    python: false,
    "machine learning": false,
    django: false,
    "data science": false,
    Javascript: false,
    php: false,
    "c++": false,
    "c ": false,
    laravel: false,
    react: false,
    angular: false,
    "version control": false,
    "version control2": false,
  });
  const changeTopics = (e: ChangeEvent<HTMLInputElement>) => {
    setTopics((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  // Levels filter
  const [levels, setLevels] = useState({
    "All levels": false,
    Beginner: false,
    Intermediate: false,
    Advanced: false,
  });
  const changeLevels = (e: ChangeEvent<HTMLInputElement>) => {
    let newLevels = { ...levels };
    if (e.target.name === "All levels" && !levels["All levels"]) {
      for (let level of Object.keys(newLevels)) {
        newLevels[level as keyof typeof newLevels] = true;
      }
      setLevels(newLevels);
    } else {
      newLevels={...newLevels,[e.target.name]:e.target.checked}
      setLevels(newLevels)
    }
    let levelArr:string[] =[]
     Object.entries(newLevels).map(([level,ischecked])=>ischecked===true&&level!="All levels"?levelArr.push(level):"")
    console.log(levelArr.join(','))
    
  };

  // Price filter
  const min = 0;
  const max = 2000;
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMinValue(value >= maxValue ? maxValue - 1 : value);
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMaxValue(value <= minValue ? minValue + 1 : value);
  };

  // Reset Filters
  const resetFilters = () => {
    //reset Levels
    let newLevels = { ...levels };
    for (let level of Object.keys(newLevels)) {
      newLevels[level as keyof typeof newLevels] = false;
    }
    setLevels(newLevels);
    //reset Topics
    let newTopics = { ...topics };
    for (let topic of Object.keys(newTopics)) {
      newTopics[topic as keyof typeof newTopics] = false;
    }
    setTopics(newTopics);

    //reset Price
    setMaxValue(max);
    setMinValue(min);
    //reset Rating
    setRating(0);
  };

  // Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
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
          <span className="text-[1.25rem] text-primary-text  font-bold ">
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
                  X Clear all filters
                </span>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-2xl text-secondary-text hover:text-primary-text transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Filters */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
              <Ratings value={rating} onChange={changeRating} />
              <Topics values={topics} onChange={changeTopics} />
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
