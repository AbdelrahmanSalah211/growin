import Image from "next/image";

interface CourseHeaderProps {
  src: string;
  alt: string;
  image: boolean;
}
export default function CourseHeader({ alt, image, src }: CourseHeaderProps) {
  return image ? (
    <Image
      alt={alt}
      src={src}
      width={1200}
      height={450}
      className="w-full h-[200px] sm:h-[300px] md:h-[450px] object-cover rounded-t-[3.75rem]"
    />
  ) : (
    <video
      src={src}
      controls
      className="w-full h-[200px] sm:h-[300px] md:h-[450px] object-cover rounded-t-[3.75rem]"
    ></video>
  );
}
