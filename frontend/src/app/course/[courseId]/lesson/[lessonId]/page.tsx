"use client";
import CourseContent from "@/app/components/CourseContent";
import CourseInfo from "@/app/components/CourseInfo";
import CourseHeader from "@/app/components/CourseLessonHeader";

export default function LessonPage() {
  return (
    <div className="min-h-screen w-full bg-background px-4 py-8 md:px-8 flex justify-center">
      <article className="w-full max-w-[75rem] bg-surface rounded-[3.75rem] shadow-lg overflow-hidden">
        <CourseHeader alt="course" src="/coursecover.jpg" image={true} />
        <div className="p-6 md:p-10 flex flex-col gap-10">
        <CourseInfo subTitle="" title="" />
        <CourseContent
          lectruesNumber={20}
          lessonDuration={4}
          lessonLength={20}
          titleLesson=""
        />
        </div>
      </article>
    </div>
  );
}
