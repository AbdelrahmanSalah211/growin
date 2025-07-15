export interface ICourse {
  id: string;
  title: string;
  description: string;
  courseCover: string | null;
  level: string;
  price: number;
  rating?: number;
}
