import { getToken } from "@/lib/auth-actions";
import { searchCourse } from "@/services/courseService";
import Link from "next/link";
import React from "react";
interface Course{
  id:number
  title:string
}
interface Category{
  title:string
  courses:Course[]
}
export default async function Footer() {
  const accessToken = await getToken();
  const categories:Category[] = [
    {title:"Programming",
    courses:[]
    },
    {title:"Business",
    courses:[]},
    {title:"Languages",
    courses:[]},
    {title:"Arts Arts and Humanities",
    courses:[]},
  ];

  if (accessToken !== null) {
  const categoryQueries = [
    "Programming",
    "Business",
    "Languages",
    "Arts and Humanities",
  ];

  const results = await Promise.all(
    categoryQueries.map(category =>
      searchCourse(
        accessToken,
        `category=${encodeURIComponent(category)}&limit=5`
      )
    )
  );
  // console.log(results)
  results.forEach((result, idx) => {
    categories[idx].courses = result.data;
  });

}

  return (
    <>
      <footer className="footer bg-surface text-base-content ">
        <div className="p-[2.5rem] w-full">
          <h1 className="text-primary-text font-extrabold text-[2.25rem]">
            Explore Top Courses
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[7.5rem] w-full px-[6rem] py-[2.5rem]">
            {categories.map((category) => (
              <nav className="flex flex-col gap-2 " key={category.title}>
                <h6 className="font-bold text-[1.25rem] text-primary-text">
                  {category.title}
                </h6>
                {
                  category.courses.map((course)=>(
                    <Link
                  href={`courses/${course.id}`}
                  className="link link-hover text-[1.125rem] text-primary-text"
                  key={course.id}
                >
                  {course.title}
                </Link>
                  ))
                }
             
              </nav>
            ))}
          </div>
        <hr className=" text-border w-full" />

        <div className="font-extrabold text-[1.5rem] flex justify-center w-full flex-col items-center text-primary-text">
          Growin
          <span className="text-secondary-text font-normal text-[1rem]">
            © 2025 Growin, Inc.
          </span>
        </div>
        </div>
      </footer>
    </>
  );
}
