import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import ReviewStars from "@/components/reviewStars/ReviewStars";
import { getRoundedRating } from "@/utils/equations";
import { ICourse } from "@/interfaces/ICourse";
import { formatPrice } from "@/utils/formatPrice";

interface CourseCardProps {
  course: ICourse;
}

export const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const rating = getRoundedRating(
    Number(course.ratingSum),
    course.numberOfReviewers || 0
  );
  return (
    <Link href={`/course/${course.id}`} className="group">
      <div className="rounded-xl overflow-hidden shadow-md bg-surface hover:shadow-lg transition-shadow duration-300 w-[18rem] min-h-[20rem] flex flex-col">
        {/* Image */}
        <div className="relative w-full h-[9rem]">
          <Image
            src={
              course.courseCover ??
              "https://via.placeholder.com/400x160?text=No+Image"
            }
            alt={course.title ?? "No Title"}
            fill
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-2 p-4 flex-grow">
          {/* Title */}
          <h2 className="text-base font-semibold text-primary-text line-clamp-1">
            {course.title}
          </h2>

          {/* Description */}
          <p className="text-sm text-secondary-text line-clamp-2">
            {course.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-primary-text font-medium">
              {rating}
            </span>
            <ReviewStars
              name={`ratingStars-${course.id}`}
              value={rating}
              disabled
            />
          </div>

          {/* Price & Level */}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-primary-text font-bold text-sm">
              {formatPrice(+course.price!, "EGP", "en-US")}
            </span>
            <span className="text-xs bg-background text-primary-text font-medium px-2 py-0.5 rounded">
              {course.level}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
