import CourseContent from "@/components/course/CourseContent";
import ReviewStars from "@/components/reviewStars/ReviewStars";
import AddToCartButton from "@/components/ui/buttons/AddToCartButton";
import { CopyUrlButton } from "@/components/ui/buttons/CopyURLButton";
import { getToken } from "@/lib/auth-actions";
import { getCourseById } from "@/services/courseService";
import { getIsEnrolledInCourse } from "@/services/userEntrollmentsService";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";
import { roundToNearestHalf } from "@/utils/math";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { courseId: string };
}) {
  const { courseId } = await params;
  const course = await getCourseById(courseId);
  const rating = roundToNearestHalf(
    course.ratingSum / course.numberOfReviewers
  );
  const token = await getToken();
  const { enrolled } = token
    ? await getIsEnrolledInCourse(courseId, token!)
    : { enrolled: false };

  return (
    <>
      <Image
        src={course.courseCover}
        alt={course.title}
        width={600}
        height={400}
        className="w-full aspect-3/1 object-cover"
      />
      <div className="p-[2.5rem] text-primary-text space-y-[1.25rem]">
        <section className="space-y-5">
          <h1 className="text-3xl font-bold max-w-3/5 line-clamp-2">
            {course.title}
          </h1>
          <p className="text-lg">{course.description}</p>
          <div className="flex items-center gap-4">
            <span className="text-base px-[0.625rem] py-[0.3125rem] bg-background text-secondary-text rounded">
              {course.level}
            </span>
            <span className="flex items-center gap-2">
              <span>{rating}</span>
              <ReviewStars value={rating} disabled />
            </span>
          </div>
          <span className="flex items-center gap-2">
            <span className="font-bold">Created by: </span>
            <span>{course.instructor.username}</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="font-bold">Last updated: </span>
            <span>
              {formatDate(course.updatedAt, "en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </span>
        </section>
        <hr className="text-border" />
        {!enrolled && (
          <>
            <section className="flex flex-col gap-5">
              <span className="space-y-1">
                <p className="text-[1.6875rem] font-bold">
                  {formatPrice(course.price, "EGP", "en-US")}
                </p>
                <p className="text-secondary-text">Full Lifetime Access</p>
              </span>
              <span className="flex items-center gap-2">
                <AddToCartButton courseId={course.id} />
                <CopyUrlButton />
              </span>
            </section>
            <hr className="text-border" />
          </>
        )}
        <section className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold max-w-3/5 line-clamp-2">
            Course Content
          </h1>
          <CourseContent
            isEnrolled={enrolled}
            courseId={course.id}
            lessons={course.lessons}
          />
        </section>
        <hr className="text-border" />
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span className="w-7 aspect-square mask mask-star-2 bg-primary-text" />
              <span>{rating} Course rating</span>
            </h1>
            <p className="text-primary-text">
              {course.numberOfReviewers} reviews
            </p>
          </div>
          {course.reviews.map((review: any) => (
            <div key={review.studentId} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Image
                  src={review.student?.profileImage}
                  alt={review.student?.username}
                  width={50}
                  height={50}
                  className="w-10 h-10 rounded-full object-cover shadow-md border-border"
                />
                <div className="flex items-center gap-2">
                  <span className="font-bold">{review.student?.username}</span>
                </div>
              </div>
              <ReviewStars
                name={review.courseId + review.studentId}
                value={roundToNearestHalf(review.rating)}
                disabled
              />
              <p>{review.comment}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}
