import { LessonType } from "@/app/course/component/CourseLessonHeader";
import { CourseCard } from "./component/courseCard";

export default function Course() {
  return (
    <div className="flex  flex-wrap m-5 items-center justify-center">
      <CourseCard
        description="sadasd"
        level="intermeida"
        price={200}
        title="sadasdas"
        rating={30}
        courseCover="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      />
    </div>
  );
}
