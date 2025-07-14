"use client";
import { useState, useEffect } from "react";
import { FormContainer } from "@/components/layout/FormContainer";
import { getCourses } from "@/services/courseService";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";
import { useAuthStore } from "@/stores/authStore";
import { CourseCard } from "@/components/course/courseCard";

export default function Home() {
  useHydrateAuth();
  const accessToken = useAuthStore((state) => state.token) || "";

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 added loading state

  useEffect(() => {
    const fetchCourses = async () => {
      if (!accessToken) return;
      try {
        const courses = await getCourses(accessToken);
        console.log(courses);
        setCourses(courses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [accessToken]);

  return (
    <div className="space-y-[2rem] px-[7rem] py-[2rem]">
      <h1 className="text-[2.5rem] text-primary-text font-extrabold">
        Trending Courses
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[30rem]">
          <span className="loading loading-ring loading-6xl text-primary-text"></span>
        </div>
      ) : courses.length > 0 ? (
        <ul className="grid grid-cols-1 items-center justify-center md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-4">
          {courses.map((course: any) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              courseCover={course.courseCover}
              level={course.level}
              price={course.price}
              rating={4.5}
            />
          ))}
        </ul>
      ) : (
        <p className="w-full text-center text-primary-text text-4xl py-[20rem]">No courses found.</p>
      )}
    </div>
  );
}
