"use client";
import React, { FC, useState } from "react";
import SearchInput from "../../ui/inputs/SearchInput";
import Link from "next/link";

interface Lesson {
  title: string;
  duration: number;
  id: number;
}
interface CourseContentProps {
  isEnrolled: boolean;
  courseId: number;
  lessons: Lesson[];
}

const CourseContent2: FC<CourseContentProps> = ({
  isEnrolled,
  courseId,
  lessons,
}) => {
  const arr = Array.from({ length: 30 }, (_, i) => i);
  const [upperBound, setUpperBound] = useState(10);
  const remaining = lessons.length - upperBound;
  const changeUpperBound = function () {
    setUpperBound((prevValue) => prevValue + 10);
  };
  return (
    <>
      <p className="text-primary-text text-base">485 lessons</p>
      <SearchInput />
      <div className="bg-background px-[2.5rem] py-[1.5625rem] rounded-[1.25rem] mt-[1.1875rem] w-[70rem] flex flex-col gap-y-[3.125rem]">
        {lessons.slice(0, upperBound).map((lesson) => (
          <div key={lesson.id} className="flex justify-between">
            <Link
              href={`${
                isEnrolled ? `/courses/${courseId}/lesson/${lesson.id}` : "#"
              }`}
              className="text-primary-text text-2xl font-medium flex gap-[1.5rem]"
            >
              {lesson.title}
              {isEnrolled ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-6 relative top-[0.2rem]"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5"
                      stroke="#2C3E50"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              ) : (
                ""
              )}
            </Link>
            <p className="text-secondary-text text-lg">{lesson.duration}</p>
          </div>
        ))}
      </div>
      {remaining > 0 && (
        <div
          className="w-[70rem] bg-background font-bold text-lg text-center text-primary-text rounded-[1.25rem] mt-[0.625rem] py-[1rem] cursor-pointer"
          onClick={changeUpperBound}
        >
          {remaining} more lectures
        </div>
      )}
    </>
  );
};

export default CourseContent2;
