"use client";

import React, { ChangeEvent, FC, useState } from "react";
import SearchInput from "../ui/inputs/SearchInput";
import Link from "next/link";
import { LinkIcon } from "../icons/LinkIcon";

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

const CourseContent: FC<CourseContentProps> = ({
  isEnrolled,
  courseId,
  lessons,
}) => {
  const [searchText, setSearchText] = useState("");
  const [upperBound, setUpperBound] = useState(10);
  const remaining = lessons.length - upperBound;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const changeUpperBound = () => {
    setUpperBound((prev) => prev + 10);
  };

  const filteredLessons = searchText.length
    ? lessons.filter((lesson) =>
        lesson.title.toLowerCase().includes(searchText.toLowerCase())
      )
    : lessons;

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-[0.625rem]">
        <p className="text-primary-text text-base">{lessons.length} lessons</p>
        <SearchInput onChange={handleSearchChange} />
      </div>

      <div className="bg-background rounded-2xl w-full flex flex-col">
        {filteredLessons.slice(0, upperBound).map((lesson, idx) => {
          const lessonContent = (
            <div
              className={`flex justify-between py-[25px] px-[40px] ${
                isEnrolled
                  ? "hover:bg-muted/20 cursor-pointer"
                  : "cursor-default"
              } transition`}
            >
              <div className="text-primary-text text-xl font-medium flex items-center gap-[1.5rem]">
                {lesson.title}
                {isEnrolled && <LinkIcon color="#2C3E50" size={20} />}
              </div>
              <p className="text-secondary-text text-lg">{lesson.duration}</p>
            </div>
          );

          return (
            <div key={lesson.id}>
              {isEnrolled ? (
                <Link
                  href={`/course/${courseId}/lecture/${lesson.id}`}
                  className="no-underline"
                >
                  {lessonContent}
                </Link>
              ) : (
                lessonContent
              )}

              {idx < filteredLessons.length - 1 && (
                <hr className="text-border w-full" />
              )}
            </div>
          );
        })}
      </div>

      {remaining > 0 && (
        <div
          className="w-[70rem] bg-background font-bold text-lg text-center text-primary-text rounded-[1.25rem] mt-[0.625rem] py-[1rem] cursor-pointer"
          onClick={changeUpperBound}
        >
          {remaining} more lectures
        </div>
      )}
    </div>
  );
};

export default CourseContent;
