import Image from "next/image";

export enum LessonType {
  VIDEO = "video",
  DOCUMENT = "document",
  IMAGE = "image",          
}

interface CourseHeaderProps {
  src: string;
  alt: string;
  lessonType: LessonType;   
}

export default function CourseHeader({
  alt,
  src,
  lessonType,
}: CourseHeaderProps) {
  switch (lessonType) {
    case LessonType.VIDEO:
      return (
        <video
          src={src}
          controls
          className="w-full h-[200px] sm:h-[300px] md:h-[450px] object-cover rounded-t-[3.75rem]"
        />
      );

    case LessonType.DOCUMENT:
      return (
        <iframe
          src={src}
          title={alt}
          className="w-full h-[450px] rounded-t-[3.75rem] border-none"
        />
      );

    case LessonType.IMAGE:
    default:
      return (
        <Image
          alt={alt}
          src={src}
          width={1200}
          height={450}
          className="w-full h-[200px] sm:h-[300px] md:h-[450px] object-cover rounded-t-[3.75rem]"
        />
      );
  }
}
