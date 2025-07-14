"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import axios from "axios";

import CourseHeader, {
  LessonType,
} from "@/components/course/CourseLessonHeader";
import CourseContent from "@/components/course/CourseContent";
import CourseInfo from "@/components/course/CourseInfo";
import { Course } from "@/interfaces/courses";

import { checkEnrollment } from "@/services/enrollments";
import { getAccessToken } from "@/stores/authStore";

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
  const { id, courseId } = useParams() as { id: string; courseId: string };
  const lessonId = Number(id);
  const courseid = Number(courseId);
  const router = useRouter();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const accessToken = getAccessToken();
      if (!accessToken) {
        router.replace("/login");
        return;
      }

      try {
        const enrolled = await checkEnrollment(courseid);
        setIsEnrolled(enrolled);

        if (!enrolled) return;

        const [lessonRes, courseRes] = await Promise.all([
          axios.get(`http://localhost:3000/lessons/${lessonId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          axios.get(`http://localhost:3000/courses/${courseid}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);

        setLesson(lessonRes.data);
        setCourse(courseRes.data);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [lessonId, courseid]);

  if (loading) {
    return (
      <div className="text-center text-primary-text py-10">Loading...</div>
    );
  }

  // ❌ Not enrolled → show 404
  if (isEnrolled === false) {
    notFound();
  }

  // ❌ Lesson not found → also 404
  if (!lesson) {
    notFound();
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
          <CourseContent
            lessons={course?.lessons}
            courseId={course?.id || 0}
            isEnrolled={true}
          />
        </div>
      </article>
    </div>
  );
}
