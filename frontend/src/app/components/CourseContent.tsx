interface CourseContentProps {
  lectruesNumber: number;
  titleLesson: string;
  lessonDuration: number;
  lessonLength: number;
}

export default function CourseContent({
  lectruesNumber,
  lessonDuration,
  lessonLength,
  titleLesson,
}: CourseContentProps) {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-primary-text font-bold text-[2.25rem]">
          Course Content
        </h1>
        <p className="text-base text-secondary-text">
          {lectruesNumber} Lectures
        </p>
      </div>
      <div className="cursor-pointer flex justify-between items-center bg-background rounded-[1.25rem] w-full p-6">
        <div className="flex gap-[0.625rem] items-center">
          <h2 className="text-primary-text font-semibold">{titleLesson}</h2>
        </div>
        <p>{lessonDuration}min</p>
      </div>
      <div className="rounded-[1.25rem] bg-background p-6 w-full">
        <h2 className="text-center text-primary-text font-semibold">
          {lessonLength} more lectures
        </h2>
      </div>
    </section>
  );
}
