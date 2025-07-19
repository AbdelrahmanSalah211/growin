import { FC } from "react";
import { ICourse } from "@/interfaces/ICourse";
import ReviewStars from "../reviewStars/ReviewStars";
import { roundToNearestHalf } from "@/utils/math";
import RemoveFromCartButton from "../ui/buttons/RemoveFromCartButton";
import { formatPrice } from "@/utils/formatPrice";
import Image from "next/image";
import Link from "next/link";

interface CartItemProps {
    course: Omit<ICourse, "id"> & { courseId: string };
}

const CartItem: FC<CartItemProps> = ({ course }) => {
    const rating = roundToNearestHalf(
        Number(course.ratingSum) / Number(course.numberOfReviewers)
    );
    return (
        <Link href={`/course/${course.courseId}`} className="block">
            <div className="flex gap-6 p-4 bg-surface rounded-[1.25rem] shadow-sm border border-border w-full max-w-5xl items-center">
                {/* Course Image */}
                <div className="w-[18rem] h-[10.25rem] rounded-xl bg-background flex-shrink-0 overflow-hidden flex items-center justify-center">
                    <Image
                        src={course.courseCover!}
                        alt={course.title!}
                        width={400}
                        height={250}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col flex-1 gap-2 justify-between">
                    <h2 className="font-bold text-[1.25rem] text-primary-text max-w-[24.4rem] line-clamp-2">
                        {course.title}
                    </h2>
                    <div className="flex items-center gap-2">
                        <span className="text-secondary-text text-[1rem] font-normal">
                            {rating}
                        </span>
                        <div className="-mt-[0.3rem]">
                            <ReviewStars
                                name={course.courseId}
                                value={rating}
                                disabled
                            />
                        </div>
                    </div>
                    <span className="w-fit text-[1rem] text-secondary-text bg-background rounded-[0.3125rem] px-[0.625rem] py-[0.3125rem]">
                        {course.level}
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-base] text-primary-text">
                        {formatPrice(+(course.price ?? 0), "EGP", "en-US")}
                    </span>
                    <RemoveFromCartButton courseId={+course.courseId!} />
                </div>
            </div>
        </Link>
    );
};

export default CartItem;
