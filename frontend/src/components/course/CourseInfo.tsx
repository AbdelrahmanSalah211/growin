import React from "react";
import { Course } from "@/interfaces/courses";
import ReviewStars from "../reviewStars/ReviewStars";

interface CourseInfoProps {
  course: Course;
}
////
const CourseInfo: React.FC<CourseInfoProps> = ({ course }) => {
  const title = course.title || "";
  const description = course.description || "";
  const level = course.level || "";
  const rating = course.ratingSum && course.numberOfReviewers ? course.ratingSum / course.numberOfReviewers : 0;
  const numberOfReviewers = course.numberOfReviewers || 0;
  const students = course.students || 0;
  const instructors = Array.isArray(course.instructor)
    ? course.instructor.map((i: any) => i.username).join(", ")
    : course.instructor?.username || "";
  const lastUpdated = course.updatedAt ? new Date(course.updatedAt).toLocaleDateString("en-US", { month: "numeric", year: "numeric" }) : "-";

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Title */}
      <h1 className="font-inter font-bold text-[2.25rem] leading-none text-primary-text mb-4">
        {title}
      </h1>
      {/* Description */}
      <div className="font-inter font-normal text-[1.25rem] leading-none text-primary-text mb-6">
        {description}
      </div>
      {/* Level, Rating, Reviews, Students */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {/* Level */}
        <div className="bg-background rounded-[0.3125rem] px-4 py-1 min-w-[7.3125rem] h-[1.875rem] flex items-center">
          <span className="font-inter font-normal text-[1rem] text-secondary-text leading-none">
            {level}
          </span>
        </div>
        {/* Rating */}
        <span className="font-inter font-normal text-[1rem] text-primary-text">
          {rating.toFixed(1)}
        </span>
        {/* Stars */}
        <div className="h-[1.125rem] flex items-center">
          <ReviewStars value={rating} disabled />
        </div>
        {/* Number of reviewers */}
        <span className="font-inter font-normal text-[1rem] text-secondary-text">
          ({numberOfReviewers.toLocaleString()})
        </span>
        {/* Students */}
        <span className="font-inter font-normal text-[1rem] text-primary-text">
          {students.toLocaleString()} students
        </span>
      </div>
      {/* Created by and Last updated */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="font-inter font-bold text-[1.125rem] text-primary-text">
          Created by: <span className="font-inter font-normal">{instructors}</span>
        </div>
        <div className="font-inter font-bold text-[1.125rem] text-primary-text">
          Last updated: <span className="font-inter font-normal">{lastUpdated}</span>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
