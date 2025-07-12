import Link from "next/link";
import { LinkIcon } from "./icons/LinkIcon";

interface CourseContentProps {
  lessons?: Lessons[];
}

interface Lessons {
  title: string;
  duration: number;
  id: number;
}

export default function CourseContent({ lessons }: CourseContentProps) {
  return (
    <section className="flex flex-col gap-6">
      <div>
        <h1 className="text-primary-text font-bold text-[2.25rem]">
          Course Content
        </h1>
        <p className="text-base text-secondary-text">
          {lessons?.length} Lectures
        </p>
      </div>
      <div className=" flex flex-col   bg-background rounded-[1.25rem] w-full p-6">
        {lessons?.map((lesson: Lessons, key: number) => (
          
          
          <Link href={`./${13}/lesson/${lesson.id}`} key={key}>
            <div className="flex justify-between  cursor-pointer  items-center">
              <div className="flex  gap-[0.625rem] py-[1.875rem] items-center">
                <h2 className="text-primary-text  font-semibold">
                  {lesson.title}
                </h2>
                <LinkIcon />
              </div>
              <p>{lesson.duration} min</p>
            </div>

            <hr className="border-t border-border" />
          </Link>
        ))}
      </div>

      {lessons?.length > 10 ? (
        <button className="cursor-pointer rounded-[1.25rem] bg-background p-6 w-full">
          <h2 className="text-center text-primary-text font-semibold">
            show more review
          </h2>
        </button>
      ) : (
        <></>
      )}
    </section>
  );
}
