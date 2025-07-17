"use client";

import { FC } from "react";

export interface AnimatedErrorListProps {
  errors: Record<string, string[]>;
  visible: boolean;
}

export const AnimatedErrorList: FC<AnimatedErrorListProps> = ({
  errors,
  visible,
}) => {
  return (
    <section
      className={`
        bg-surface flex flex-col gap-4 rounded-[1.25rem]
        overflow-y-auto max-h-[90vh] scrollbar z-10
        transition-all duration-300 ease-in-out
        ${
          visible
            ? "opacity-100 max-w-[20rem] p-[1.5625rem]"
            : "opacity-0 max-w-0 p-0 overflow-hidden"
        }
      `}
      style={{ minWidth: visible ? "20rem" : "0" }}
    >
      <div className="flex flex-col gap-[0.625rem]">
        <h1 className="max-w-2/3 text-3xl font-bold text-primary-text">
          Check Your Entries!
        </h1>
        {Object.entries(errors).map(
          ([field, messages]) =>
            messages.length > 0 && (
              <div key={field} className="relative">
                <p className="capitalize text-base text-primary-text font-semibold">
                  {field.replace(/_/g, " ")}
                </p>
                <ul className="flex flex-col gap-2 px-4 py-2">
                  {messages.map((message, index) => (
                    <li className="text-sm text-primary-text" key={index}>
                      {message}
                    </li>
                  ))}
                </ul>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default AnimatedErrorList;
