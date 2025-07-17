"use client";
import { ChangeEvent, FC, useState, useMemo } from "react";
import RadioButton from "../ui/inputs/RadioButton";

export interface CategoriesDTO {
  selectedCategory: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  categories: string[];
}

const Categories: FC<CategoriesDTO> = ({
  selectedCategory,
  onChange,
  categories,
}) => {
  const INITIAL_COUNT = 4;
  const STEP = 4;
  const ITEM_HEIGHT = 48; // adjust to match RadioButton height in px

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const isFullyExpanded = visibleCount >= categories.length;

  const handleShowMore = () => {
    const nextCount = visibleCount + STEP;
    if (nextCount >= categories.length) {
      setVisibleCount(categories.length);
    } else {
      setVisibleCount(nextCount);
    }
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_COUNT);
  };

  // Calculate height based on number of visible items
  const containerHeight = useMemo(() => {
    return `${visibleCount * ITEM_HEIGHT}px`;
  }, [visibleCount]);

  return (
    <div>
      <h1 className="text-[1.75rem] font-extrabold text-primary-text pb-[1.25rem]">
        Categories
      </h1>

      <div
        className="flex flex-col gap-[0.625rem] text-primary-text overflow-hidden transition-[max-height] duration-500 ease-in-out"
        style={{ maxHeight: containerHeight }}
      >
        {categories.map((category) => (
          <div key={category} className="opacity-100 transition-opacity">
            <RadioButton
              id={category}
              name="categories"
              value={category}
              checked={selectedCategory === category}
              onChange={onChange}
              title={category}
            />
          </div>
        ))}
      </div>

      {categories.length > INITIAL_COUNT && (
        <div
          className="text-primary-text font-bold pt-[0.6875rem] cursor-pointer flex items-center gap-1 w-fit"
          onClick={isFullyExpanded ? handleShowLess : handleShowMore}
        >
          {isFullyExpanded ? "Show less" : "Show more"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isFullyExpanded
                  ? "M19.5 15.75L12 8.25 4.5 15.75"
                  : "M4.5 8.25l7.5 7.5 7.5-7.5"
              }
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Categories;
