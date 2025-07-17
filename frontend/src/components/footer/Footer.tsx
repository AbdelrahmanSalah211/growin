import { searchCourse } from "@/services/courseService";
import Link from "next/link";

interface Course {
  id: number;
  title: string;
}
interface Category {
  title: string;
  courses: Course[];
}

export default async function Footer() {
  const categoryTitles = [
    "Programming",
    "Business",
    "Languages",
    "Arts and Humanities",
  ];

  const categories: Category[] = await Promise.all(
    categoryTitles.map(async (title) => {
      const result = await searchCourse(
        `category=${encodeURIComponent(title)}&limit=5`
      );
      return {
        title,
        courses: result.data,
      };
    })
  );

  return (
    <footer className="bg-surface text-base-content w-full">
      <section className="space-y-[2.5rem] p-[2.5rem]">
        <h1 className="text-primary-text font-extrabold text-3xl">
          Explore Top Courses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-[4.25rem] gap-x-[7.5rem]">
          {categories.map(({ title, courses }) => (
            <div key={title}>
              <h2 className="font-bold text-lg text-primary-text mb-[0.9375rem]">
                {title}
              </h2>
              {courses.map(({ id, title }) => (
                <Link
                  key={id}
                  href={`/courses/${id}`}
                  className="block link-hover text-base text-primary-text"
                >
                  {title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </section>

      <hr className="text-border" />

      <div className="text-center text-primary-text font-extrabold text-2xl py-5">
        Growin
        <div className="text-secondary-text font-normal text-base">
          © 2025 Growin, Inc.
        </div>
      </div>
    </footer>
  );
}
