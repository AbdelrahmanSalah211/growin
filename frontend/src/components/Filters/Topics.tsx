"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, FC, useState } from "react";
import CheckBox from "../inputs/CheckBox";

export interface TopicsDTO {
  values?: { [key: string]: boolean };
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Topics: FC<TopicsDTO> = ({
  values = {
    
  },
  onChange = () => {},
}) => {
  const [upperBound, setUpperBound] = useState(4);

  const showMore = () => {
    if (upperBound < Object.keys(values).length) {
      setUpperBound((prev) => prev + 4);
    }
  };

  const resetShown = () => {
    setUpperBound(4);
  };

  return (
    <>
      <div>
        <h1 className="text-[1.75rem] font-extrabold text-primary-text pb-[1.25rem]">
          Topics
        </h1>
        <div className="gap-[0.625rem] text-primary-text flex flex-col">
          <AnimatePresence initial={false}>
            {Object.entries(values)
              .slice(0, upperBound)
              .map(([key, isChecked]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CheckBox
                    id={key}
                    name={key}
                    value={key}
                    checked={isChecked}
                    onChange={onChange}
                    title={key}
                  />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {upperBound < Object.keys(values).length && (
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
        {upperBound >= Object.keys(values).length && upperBound > 4 && (
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
    </>
  );
};

export default Topics;
