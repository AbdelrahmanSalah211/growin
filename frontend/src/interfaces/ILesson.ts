export interface ILesson {
  id?: number;
  title?: string;
  position?: number;
  section?: string;
  subTitle?: string;
  lessonType?: string;
  fileURL?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}
