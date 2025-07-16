import React from "react";
import { Course } from "@/interfaces/courses";
import ReviewStars from "../reviewStars/ReviewStars";

interface CartItemProps {
  course: Course;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ course, onRemove }) => {
  return (
    <div className="flex gap-6 p-4 bg-surface rounded-[1.25rem] shadow-sm border border-border w-full max-w-5xl items-center">
      {/* Course Image */}
      <div className="w-[18rem] h-[10.25rem] rounded-[1.25rem] bg-background border border-border shadow-sm flex-shrink-0 overflow-hidden flex items-center justify-center">
        <img
          src={course.courseCover}
          alt={course.title}
          className="object-cover w-full h-full rounded-[1.25rem]"
        />
      </div>
      {/* Course Details */}
      <div className="flex flex-col flex-1 justify-between min-w-0">
        <div>
          <h2 className="font-inter font-bold text-[1.25rem] leading-none text-primary-text mb-1 max-w-[24.4rem] truncate">
            {course.title}
          </h2>
          <div className="font-inter font-normal text-[1rem] leading-none text-secondary-text mb-1 max-w-[19.375rem] truncate">
            {course.instructor?.username}
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-secondary-text text-[1rem] font-normal">
              {course.ratingSum ? (course.ratingSum / (course.numberOfReviewers || 1)).toFixed(1) : "0.0"}
            </span>
            <div className="h-[1.125rem] flex items-center">
              <ReviewStars
                value={course.ratingSum ? course.ratingSum / (course.numberOfReviewers || 1) : 0}
                disabled
              />
            </div>
            <span className="text-secondary-text text-[1rem] font-normal">
              ({course.numberOfReviewers?.toLocaleString() || 0})
            </span>
          </div>
          <div className="inline-block bg-background rounded-[0.3125rem] px-4 py-1 mt-1" style={{ minWidth: '7.3125rem', height: '1.875rem' }}>
            <span className="font-inter font-normal text-[1rem] text-secondary-text leading-none">
              {course.level}
            </span>
          </div>
        </div>
      </div>
      {/* Price and Remove Button */}
      <div className="flex flex-col items-start pt-2 min-w-[8rem]">
        <span className="font-inter font-bold text-[1.125rem] text-primary-text mb-2 whitespace-nowrap">
          E£{course.price.toLocaleString()}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="w-[7.0625rem] h-[3.125rem] rounded-[0.625rem] text-base font-inter font-normal bg-background border border-border text-primary-text hover:bg-surface transition-colors"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;

