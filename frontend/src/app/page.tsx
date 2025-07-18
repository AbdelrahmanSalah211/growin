import { getCourses } from "@/services/courseService";
import { CourseCard } from "@/components/course/CourseCard";
import { ICourse } from "@/interfaces/ICourse";
import { removeAuth } from "@/lib/auth-actions";

export default async function Home() {
  const courses = await getCourses();
  return (
    <div
      /*onClick={removeAuth}*/ className="space-y-[2rem] mx-[7.5rem] p-[3rem] bg-surface rounded-[1.25rem]"
    >
      <h1 className="text-4xl text-primary-text font-bold">Trending Courses</h1>

      {courses.length > 0 ? (
        <ul className="grid grid-cols-1 items-center justify-center md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-4">
          {courses.map((course: ICourse, index: number) => (
            <CourseCard course={course} key={index} />
          ))}
        </ul>
      ) : (
        <p className="w-full text-center text-primary-text text-2xl py-[20rem]">
          No courses found.
        </p>
      )}
    </div>
  );
}
