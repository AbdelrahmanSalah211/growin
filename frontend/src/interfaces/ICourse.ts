import { ILesson } from "./ILesson";
import { IReview } from "./IReview";
import { IEnrollment } from "./IEnrollment";
import { IInstructor } from "./IInstructor";

export interface ICourse {
  id?: number;
  title?: string;
  description?: string;
  isPublished?: boolean;
  language?: string;
  imageDeleteURL?: string;
  courseCover?: string;
  level?: string;
  price?: string;
  ratingSum?: string;
  numberOfReviewers?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;

  lessons?: ILesson[];
  reviews?: IReview[];
  enrollments?: IEnrollment[];
  instructor?: IInstructor;
}
