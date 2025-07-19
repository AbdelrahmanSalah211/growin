"use client";
import { useState, useEffect } from "react";
import { getUserEnrollments } from "@/services/userEntrollmentsService";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";
import { useAuthStore } from "@/stores/authStore";
import { CourseCard } from "@/components/course/CourseCard";

export default function Page() {
  useHydrateAuth();
  const accessToken = useAuthStore((state) => state.token) || "";

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!accessToken) return;
      try {
        const courses = await getUserEnrollments(accessToken);
        setEnrolledCourses(courses);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [accessToken]);

  return (
    <div
      /*onClick={removeAuth}*/ className="space-y-[2rem] mx-[7.5rem] p-[3rem] bg-surface rounded-[1.25rem]"
    >
      <h1 className="text-4xl text-primary-text font-bold">My Learning</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[30rem]">
          <span className="loading loading-ring loading-6xl text-primary-text"></span>
        </div>
      ) : enrolledCourses.length > 0 ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {enrolledCourses.map((enrollment: any) => {
            console.log(enrollment)
            return (
              <CourseCard
                course={enrollment.course}
                key={enrollment.courseId}
              />
            );})}
        </ul>
      ) : (
        <div className="flex justify-center items-center min-h-[30rem]">
          <p className="text-2xl text-primary-text">No enrolled courses</p>
        </div>
      )}
    </div>
  );
}
