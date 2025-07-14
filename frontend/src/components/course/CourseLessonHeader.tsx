import Image from "next/image";

export enum LessonType {
  VIDEO = "video",
  DOCUMENT = "document",
  QUIZ = "quiz",

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
  console.log(src, "sadsa");
  switch (lessonType) {
    case LessonType.VIDEO:
      return (
        <video
          src={src}
          controls
          className="w-[75rem] aspect:16/9 object-cover rounded-t-[3.75rem]"
          />
      );

    case LessonType.DOCUMENT:
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(
            src
          )}&embedded=true`}
          title="Document Preview"
          className="w-[75rem] aspect:16/9 object-cover rounded-t-[3.75rem]"
        />
      );


      case LessonType.QUIZ:
      return (
        <iframe
          src={`https://docs.google.com/gview?url=${encodeURIComponent(
            src
          )}&embedded=true`}
          title="Document Preview"
          className="w-[75rem] h-[42.1875rem] object-cover rounded-t-[3.75rem]"
          />
      );

    case LessonType.IMAGE:
    default:
      return (
        <img
          alt={alt}
          src={src}
          width={1200}
          height={450}
          className="w-[75rem] h aspect:16/9 object-contain rounded-t-[3.75rem]"
        />
      );
  }
}
