"use client";

import { FC } from "react";
import { LessonType } from "./CourseLessonHeader";
import Link from "next/link";

export interface ICardInterface {
  id: string,
  title: string;
  description: string;
  courseCover: string;
  level: string;
  price: number;
  rating?: number;
}

export const CourseCard: FC<ICardInterface> = ({
  id,
  title,
  description,
  courseCover,
  level,
  price,
  rating = 0,
}) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="card rounded-[1.25rem] h-[26rem] w-[26rem] bg-surface shadow-sm">
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

              {/* Clean, proper half-star rating */}
              <div className="rating flex gap-[0.125rem] pointer-events-none select-none">
                {[1, 2, 3, 4, 5].map((n) => {
                  const starValue = n;
                  const halfValue = n - 0.5;

                  return (
                    <div key={n} className="flex">
                      {/* Left half */}
                      <input
                        type="radio"
                        className={`mask mask-star-2 mask-half-1 ${
                          rating >= halfValue ? "bg-primary-text" : "bg-surface"
                        }`}
                        readOnly
                        checked={rating >= halfValue}
                      />
                      {/* Right half */}
                      <input
                        type="radio"
                        className={`mask mask-star-2 mask-half-2 ${
                          rating >= starValue ? "bg-primary-text" : "bg-surface"
                        }`}
                        readOnly
                        checked={rating >= starValue}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <h1 className="text-primary-text font-bold text-[1.125rem]">
            E£{price}
          </h1>
          <div className="flex items-center">
            <span className="bg-background text-primary-text rounded-[0.3125rem] py-1 px-3 font-medium">
              {level}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
