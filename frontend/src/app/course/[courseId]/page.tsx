"use client";
// import { CourseCard } from "@/components/courseCard";
import CourseContent from "@/app/course/component/CourseContent";
import CourseInfo from "@/app/course/component/CourseInfo";
import CourseHeader, {
  LessonType,
} from "@/app/course/component/CourseLessonHeader";
import { UserIcon } from "@/components/icons/UserIcon";
import { Course, CourseReviewItemProps } from "@/interfaces/courses";
import { formattedDate } from "@/utils/formateDate";
import axios from "axios";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";
import { getCourses } from "@/services/courseService";

function CourseReviewItem({ review, index }: CourseReviewItemProps) {
  return (
    <div className="flex flex-col gap-[0.875rem]">
      <div className="flex items-center gap-[0.875rem]">
        <UserIcon />
        <div className="flex flex-col">
          <h3 className="text-primary-text font-bold">
            {review.student?.username || "Anonymous"}
          </h3>
          <div className="flex items-center gap-2">
            <span>{review.rating}</span>
            <div className="rating flex gap-[0.125rem]">
              {[1, 2, 3, 4, 5].map((n) => (
                <input
                  key={n}
                  type="radio"
                  name={`rating-${index}`}
                  className="mask w-[1.0625rem] mask-star bg-secondary-text"
                  aria-label={`${n} star`}
                  defaultChecked={n === review.rating}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-primary-text font-normal">{review.comment}</h3>
      <hr className="border-t border-border" />
    </div>
  );
}
export default function CoursesPage() {
  const [course, setCourse] = useState<Course | null>(null);
  const { courseId } = useParams() as { courseId: string };
  const numericId = Number(courseId);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchCourse = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `http://localhost:3000/courses/${numericId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJlbWFpbCI6Im9tYXJmb3VhZDE1ZUBnbWFpbC5jb20iLCJ1c2VyTW9kZSI6Imluc3RydWN0b3IiLCJpYXQiOjE3NTE5ODY5NTAsImV4cCI6MTc1MjU5MTc1MH0.xXiEC0VSuWVyWzYDnvBfqQ_-9RmoiGt-Jk--PdoO_XU`,
  //           },
  //         }
  //       );

  //       setCourse(data);
  //     } catch (err) {
  //       console.log(err);
  //       console.error("Error fetching course:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCourse();
  // }, [numericId]);

  useEffect(() => {
    const fetchCourse = async () => {
      return await getCourses(
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJlbWFpbCI6Im9tYXJmb3VhZDE1ZUBnbWFpbC5jb20iLCJ1c2VyTW9kZSI6Imluc3RydWN0b3IiLCJpYXQiOjE3NTE5ODY5NTAsImV4cCI6MTc1MjU5MTc1MH0.xXiEC0VSuWVyWzYDnvBfqQ_-9RmoiGt-Jk--PdoO_XU`,
        courseId
      );
    };

    fetchCourse();
  }, [numericId]);
  const avgRating =
    Math.round(
      ((course?.ratingSum ?? 0) / (course?.numberOfReviewers || 1)) * 10
    ) / 10;
  return (
    <div className="min-h-screen w-full bg-background px-4 py-8 md:px-8 flex justify-center">
      <article className="w-full max-w-[75rem] bg-surface rounded-[3.75rem] shadow-lg overflow-hidden">
        <CourseHeader
          alt={course?.title || "Course Image"}
          src={
            course?.courseCover ||
            "https://i.ibb.co/2HTV3dh/Default-profile-image.jpg"
          }
          lessonType={LessonType.IMAGE}
        />

        <div className="p-6 md:p-10 flex flex-col gap-10">
          {/* Title & Description */}
          <section className="flex flex-col gap-5">
            <CourseInfo
              title={course?.title}
              description={course?.description}
            />

            {/* Badge, Rating, Stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base max-w-4xl">
              <span className="bg-background text-primary-text rounded-[0.3125rem] py-1 px-3 font-medium">
                {course?.level}
              </span>

              <div className="flex items-center gap-2">
                {(() => {
                  return (
                    <>
                      <span>{avgRating}</span>
                      <div className="rating flex gap-[0.125rem]">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <input
                            key={n}
                            type="radio"
                            name="rating"
                            className="mask mask-star bg-primary-text"
                            aria-label={`${n} star`}
                            defaultChecked={Math.round(avgRating) === n}
                            readOnly
                          />
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>

              <p className="text-secondary-text">{course?.ratingSum}</p>
              <p className="text-primary-text">
                {course?.enrollments?.length ?? 0}
                <span className="px-0.5 text-secondary-text">students</span>
              </p>
            </div>

            {/* Author & Date */}
            <div className="flex flex-col gap-2 text-base sm:text-lg">
              <p className="text-primary-text font-bold">
                Created by:
                <span className="font-normal">
                  {course?.instructor.username}
                </span>
              </p>
              <p className="text-primary-text font-bold">
                Last updated:{" "}
                <span className="font-normal">
                  {formattedDate(course?.updatedAt ?? "")}
                </span>
              </p>
            </div>
          </section>

          <hr className="border-t border-border" />

          {/* Price & Buttons */}
          <section className="flex flex-col gap-6">
            <div>
              <h1 className="text-primary-text font-bold text-[2.25rem]">
                E£{course?.price}
              </h1>
              <p className="text-primary-text text-base">
                Full Lifetime Access
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 w-full">
              <button className="text-center w-full sm:w-auto px-[8.375rem] py-[1.06255rem] rounded-[0.625rem] bg-primary-text text-background text-base font-semibold hover:opacity-90 transition">
                Enroll Now
              </button>
              <button className="text-center w-full sm:w-auto px-[1.6875rem]  py-[1.06255rem] rounded-[0.625rem] bg-background text-primary-text text-base font-semibold hover:opacity-90 transition">
                Share
              </button>
            </div>
          </section>

          <hr className="border-t border-border" />

          {/* Course Content */}

          <CourseContent lessons={course?.lessons} courseId={course?.id || 0} />

          <hr className="border-t border-border" />
          {/* reviews section */}
          <section>
            <div className="pb-10">
              <h1 className="text-primary-text font-bold text-[2.25rem]">
                {avgRating} Course rating - {course?.reviews.length} rewiews
              </h1>
            </div>

            {course?.reviews.map((review: any, index: number) => (
              <CourseReviewItem key={index} review={review} index={index} />
            ))}

            <button className="cursor-pointer rounded-[1.25rem] bg-background p-6 w-full">
              <h2 className="text-center text-primary-text font-semibold">
                show more review
              </h2>
            </button>
          </section>
        </div>
      </article>
    </div>
  );
}
