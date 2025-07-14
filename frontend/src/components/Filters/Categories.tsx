"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, FC, useState } from "react";
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
  const [upperBound, setUpperBound] = useState(4);

  const showMore = () => {
    if (upperBound < categories.length) {
      setUpperBound((prev) => prev + 4);
    }
  };

  const resetShown = () => {
    setUpperBound(4);
  };

  return (
    <div>
      <h1 className="text-[1.75rem] font-extrabold text-primary-text pb-[1.25rem]">
        Categories
      </h1>
      <div className="gap-[0.625rem] text-primary-text flex flex-col">
        <AnimatePresence initial={false}>
          {categories.slice(0, upperBound).map((category) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <RadioButton
                id={category}
                name="categories"
                value={category}
                checked={selectedCategory === category}
                onChange={onChange}
                title={category}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {upperBound < categories.length && (
        <div
          className="text-primary-text font-bold pt-[0.6875rem] cursor-pointer flex items-center gap-1 w-fit"
          onClick={showMore}
        >
          Show more
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
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      )}

      {upperBound >= categories.length && upperBound > 4 && (
        <div
          className="text-primary-text font-bold pt-[0.6875rem] cursor-pointer flex items-center gap-1 w-fit"
          onClick={resetShown}
        >
          Show less
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
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Categories;
