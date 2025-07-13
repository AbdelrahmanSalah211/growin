"use client";

import { useState } from "react";
import Link from "next/link";
import { LinkIcon } from "./icons/LinkIcon";
import SearchInput from "./ui/inputs/SearchInput";

interface CourseContentProps {
  lessons?: Lessons[];
  courseId: number;
}

interface Lessons {
  title: string;
  duration: number;
  id: number;
}

export default function CourseContent({
  lessons = [],
  courseId,
}: CourseContentProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-primary-text font-bold text-[2.25rem]">
          Course Content
        </h1>
        <p className="text-base text-secondary-text">
          {lessons.length} Lectures
        </p>
      </div>

      {/* Search bar */}
      <div className="flex ">
        <SearchInput onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="flex flex-col bg-background rounded-[1.25rem] w-full p-6">
        {filteredLessons.map((lesson, key) => (
          <Link
            href={`/course/${courseId}/lesson/${lesson.id}`}
            key={key}
            scroll={false}
          >
            <div className="flex justify-between cursor-pointer items-center">
              <div className="flex gap-[0.625rem] py-[1.875rem] items-center">
                <h2 className="text-primary-text text-[1.75rem] font-semibold">
                  {lesson.title}
                </h2>
                <LinkIcon />
              </div>
              <p>{lesson.duration} min</p>
            </div>
            <hr className="border-t border-border" />
          </Link>
        ))}
      </div>

      {lessons.length > 10 && (
        <button className="cursor-pointer rounded-[1.25rem] bg-background p-6 w-full">
          <h2 className="text-center text-primary-text font-semibold">
            Show more lessons
          </h2>
        </button>
      )}
    </section>
  );
}
