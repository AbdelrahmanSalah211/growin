import axios from "axios";
import { AxiosError } from "axios";

import { getAccessToken } from "@/stores/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface createCoursePayload {
  title: string;
  description: string;
  isPublished: boolean;
  language: string;
  imageDeleteURL: string;
  ratingSum: number;
  level: "beginner" | "intermediate" | "advanced";
  price: number;
  numberOfReviewers: number;
}
export async function getCourses(accessToken: string) {
  try {
    const response = await axios.get(`${API_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data || axiosError.message;
  }
}

async function createCourse(payload: createCoursePayload) {
  const accessToken = getAccessToken();
  try {
    const response = await axios.post(`${API_URL}/courses`, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data || axiosError.message;
  }
}
