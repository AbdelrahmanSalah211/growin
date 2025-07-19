import CourseContent from "@/components/course/CourseContent";
import MediaPlayer from "@/components/ui/media/mediaPLayer";
import { getToken } from "@/lib/auth-actions";
import { getCourseById } from "@/services/courseService";
import { getIsEnrolledInCourse } from "@/services/userEntrollmentsService";
export default async function Page({
  params,
}: {
  params: { courseId: string, id: string };
}) {
  const { courseId, id } = await params;
  const course = await getCourseById(courseId);
  const lesson = course.lessons.find((l: any) => l.id == id);

  const token = await getToken();
  const { enrolled } = await getIsEnrolledInCourse(courseId, token!);

  return (
    <>
      {/* <MediaPlayer url={lesson.fileURL} /> */}
      <video controls className="w-full aspect-video" src={lesson.fileURL}></video>
      <div className="p-[2.5rem] text-primary-text space-y-[1.25rem]">
        <section className="space-y-5">
          <h1 className="text-3xl font-bold max-w-3/5 line-clamp-2">
            {lesson.title}
          </h1>
        </section>
        <hr className="text-border" />
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
      </div>
    </>
  );
}
