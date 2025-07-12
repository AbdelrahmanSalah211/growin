"use client";

import { FC } from "react";
import { LessonType } from "./CourseLessonHeader";

export interface ICardInterface {
  title: string;
  description: string;
  courseCover: string;
  level: LessonType;
  price: number;
}

export const CourseCard: FC<ICardInterface> = ({
  title,
  description,
  courseCover,
  level,
  price,
}) => {
  return (
    <div className="w-[21.875rem] py-[25.5625rem] rounded-[1.25rem] border border-border bg-white shadow-sm overflow-hidden flex flex-col">
      <div className="w-full py-[12.5rem] overflow-hidden">
        <img
          src={courseCover}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-primary-text">{title}</h2>
          <p className="text-sm text-secondary-text mt-2 line-clamp-3">
            {description}
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm bg-background text-primary-text font-medium px-3 py-1 rounded-full">
            {level}
          </span>
          <span className="text-primary-text font-bold text-lg">${price}</span>
        </div>
      </div>
    </div>
  );
};
