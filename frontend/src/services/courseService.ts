import { AxiosError } from "axios";
import axiosInstance from "@/lib/axiosInstance";

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

export async function getCourses(accessToken: string, id?: string) {
  try {
    const url = id ? `${API_URL}/courses/${id}` : `${API_URL}/courses`;
    console.log(url);

    const response = await axiosInstance.get(`${url}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
      },
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data || axiosError.message;
  }
}

export async function createCourse(payload: createCoursePayload) {
  const accessToken = getAccessToken();
  try {
    const response = await axiosInstance.post(`${API_URL}/courses`, payload, {
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
export async function searchCourse(accessToken: string, queryparams?: string) {
  try {
    const url = `${API_URL}/courses/search?${queryparams}`;
    console.log(url);

    const response = await axiosInstance.get(`${url}`, {
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