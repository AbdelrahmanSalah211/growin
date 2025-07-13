"use client";
import { useState } from "react";
import { FormContainer } from "@/components/layout/FormContainer";
import { getCourses } from "@/services/courseService";
import { getToken } from "@/lib/auth-actions";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

export default function Home() {
  useHydrateAuth();
  const accessToken = useAuthStore((state) => state.token) || "";

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!accessToken) return;
      try {
        const courses = await getCourses(accessToken);
        setCourses(courses);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, [accessToken]); // re-run whenever token changes

  return (
    <div>
      <FormContainer />
      <ul>
        {courses.map((course: any) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}