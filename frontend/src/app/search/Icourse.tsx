export interface Icourse {
  id: string;
  title: string;
  description: string;
  courseCover: string | null;
  level: string;
  price: number;
  rating?: number;
}
