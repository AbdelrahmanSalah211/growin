"use client";

import { FC } from "react";
import { LessonType } from "./CourseLessonHeader";

export interface ICardInterface {
  title: string;
  description: string;
  courseCover: string;
  level: string;
  price: number;
  rating?: number;
}

export const CourseCard: FC<ICardInterface> = ({
  title,
  description,
  courseCover,
  level,
  price,
  rating = 0,
}) => {
  return (
    <div className="card rounded-[1.25rem] h-[26rem] w-[26rem] bg-base-100 shadow-sm">
      <figure className="w-full">
        <img
          src={courseCover}
          alt={title}
          className="w-full h-[10rem] object-cover rounded-t-[1.25rem]"
        />
      </figure>

      <div className="card-body px-4 py-6 flex flex-col justify-between">
        <div>
          <h2 className="card-title font-bold text-[1.25rem] text-primary-text">
            {title}
          </h2>
          <p className="font-normal text-[1rem] text-secondary-text mt-1">
            {description}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-secondary-text text-[1rem] font-normal">
              {Math.round(rating * 10) / 10}
            </span>
            <div className="rating flex gap-[0.125rem]">
              {[1, 2, 3, 4, 5].map((n) => (
                <input
                  key={n}
                  type="radio"
                  name={`rating-${title}`}
                  className="mask mask-star bg-secondary-text"
                  aria-label={`${n} star`}
                  defaultChecked={Math.round(3) === n}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
        <h1 className="text-primary-text font-bold text-[1.125rem]">
          E£{price}
        </h1>
        <div className=" flex  items-center">
          <span className="bg-background text-primary-text rounded-[0.3125rem] py-1 px-3 font-medium">
            {level}
          </span>
        </div>
      </div>
    </div>
  );
};
