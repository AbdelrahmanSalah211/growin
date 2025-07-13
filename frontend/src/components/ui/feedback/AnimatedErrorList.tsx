"use client";

import { FC } from "react";

export interface AnimatedErrorListProps {
  errors: Record<string, string[]>;
}

export const AnimatedErrorList: FC<AnimatedErrorListProps> = ({ errors }) => {
  const hasErrors = Object.values(errors).some((arr) => arr.length > 0);

  return (
    <div
      className={`bg-white/80 backdrop-blur hidden
        lg:flex flex-col gap-2 rounded-[0.625rem]
        transition-all duration-500
        opacity-0 w-80 max-h-[90vh] overflow-y-auto
        scrollbar
        z-10
        ${hasErrors ? "p-6 opacity-100" : ""}
      `}
    >
      {Object.entries(errors).map(
        ([field, messages]) =>
          messages.length > 0 && (
            <div key={field} className="relative">
              <p className="capitalize text-lg text-primary-text font-semibold">
                {field.replace(/_/g, " ")}
              </p>
              <ul className="flex flex-col gap-2 px-4 py-2 before:content-['-'] before:absolute before:left-0 before:text-primary-text">
                {messages.map((message, index) => (
                  <li className="text-base text-primary-text" key={index}>
                    {message}
                  </li>
                ))}
              </ul>
            </div>
          )
      )}
    </div>
  );
};

export default AnimatedErrorList;
