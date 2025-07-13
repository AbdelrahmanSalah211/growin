"use client";
import CourseContent from "@/components/course/CourseContent";
import CourseInfo from "@/components/course/CourseInfo";
import CourseHeader, {
  LessonType,
} from "@/components/course/CourseLessonHeader";
import { Course } from "@/interfaces/courses";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Lesson {
  id: number;
  title: string;
  subTitle?: string;
  section: string;
  lessonType: LessonType;
  fileURL: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  position: number;
}

export default function LessonPage() {
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<Course | null>(null);

  const { id, courseId } = useParams() as { id: string; courseId: string };
  const lessonId = Number(id);
  const courseid = Number(courseId);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/lessons/${lessonId}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJlbWFpbCI6Im9tYXJmb3VhZDE1ZUBnbWFpbC5jb20iLCJ1c2VyTW9kZSI6Imluc3RydWN0b3IiLCJpYXQiOjE3NTE5ODY5NTAsImV4cCI6MTc1MjU5MTc1MH0.xXiEC0VSuWVyWzYDnvBfqQ_-9RmoiGt-Jk--PdoO_XU`, // Replace with real token
            },
          }
        );
        setLesson(data);
      } catch (err) {
        console.error("Error fetching lesson:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/courses/${courseid}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjE4LCJlbWFpbCI6Im9tYXJmb3VhZDE1ZUBnbWFpbC5jb20iLCJ1c2VyTW9kZSI6Imluc3RydWN0b3IiLCJpYXQiOjE3NTE5ODY5NTAsImV4cCI6MTc1MjU5MTc1MH0.xXiEC0VSuWVyWzYDnvBfqQ_-9RmoiGt-Jk--PdoO_XU`,
            },
          }
        );

        setCourse(data);
      } catch (err) {
        console.log(err);
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();

    fetchLesson();
  }, [lessonId]);

  if (loading || !lesson) {
    return (
      <div className="text-center text-primary-text py-10">Loading...</div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-background px-4 py-8 md:px-8 flex justify-center">
      <article className="w-full max-w-[75rem] bg-surface rounded-[3.75rem] shadow-lg overflow-hidden">
        <CourseHeader
          alt={lesson.title}
          src={lesson.fileURL ?? "/fallback-image.jpg"}
          lessonType={lesson.lessonType}
        />

        <div className="p-6 md:p-10 flex flex-col gap-10">
          <CourseInfo title={lesson.title} subTitle={lesson.subTitle ?? ""} />
          <hr className="border-t border-border" />

          <CourseContent lessons={course?.lessons} courseId={course?.id || 0} />
        </div>
      </article>
    </div>
  );
}
