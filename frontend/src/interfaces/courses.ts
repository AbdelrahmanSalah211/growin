export interface Course {
  id: number;
  title?: string;
  description?: string;
  imageDeleteURL?: string;
  courseCover: string;
  numberOfReviewers?: number;
  lectures?: number;
  duration?: number;
  ratingSum?: number;
  students: number;
  price: number;
  enrollments: [];
  reviews: CourseReviewItemProps[];
  instructor: {
    username: string;
  };
  lessons: [];
  updatedAt?: string;
  level: string;
}


export interface CourseReviewItemProps {
  review: {
    student?: {
      username?: string;
    };
    rating: number;
    comment: string;
  };
  index: number;
}