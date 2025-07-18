import { AxiosError } from "axios";
import axiosInstance from "@/lib/axiosInstance";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface AddToCartPayload {
  courseId: number;
}

export async function addCourseToCart(
  payload: AddToCartPayload,
  accessToken: string
) {
  try {
    const response = await axiosInstance.post(`${API_URL}/cart`, payload, {
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

export async function getCart(accessToken: string) {
  if (!accessToken) {
    throw new Error("Access token is required argument");
  }
  try {
    const response = await axiosInstance.get(`${API_URL}/cart`, {
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

export async function removeCourseFromCart(
  courseId: number,
  accessToken: string
) {
  if (!accessToken || !courseId) {
    throw new Error("Access token and course ID are required arguments");
  }
  try {
    const response = await axiosInstance.post(
      `${API_URL}/cart/remove-course`,
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data || axiosError.message;
  }
}


export async function clearCart(accessToken: string) {
  if (!accessToken) {
    throw new Error("Access token is required argument");
  }
  try {
    const response = await axiosInstance.delete(`${API_URL}/cart`, {
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
