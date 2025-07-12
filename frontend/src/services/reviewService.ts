import axios from "axios";
import { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ReviewPayload {
    rating: number;
    comment: string;
    helpful: boolean;
}

export async function submitReview(
    courseId: string,
    payload: ReviewPayload,
    accessToken: string
) {
    if (!accessToken || !courseId) {
        throw new Error("Access token and course ID are required arguments");
    }
    try {
        const response = await axios.post(
            `${API_URL}/reviews/${courseId}`,
            payload,
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

export async function updateReview(
    courseId: string,
    payload: ReviewPayload,
    accessToken: string
) {
    if (!accessToken || !courseId) {
        throw new Error("Access token and course ID are required arguments");
    }
    try {
        const response = await axios.patch(
            `${API_URL}/reviews/${courseId}`,
            payload,
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

export async function getStudentReviews(accessToken: string) {
    if (!accessToken) {
        throw new Error("Access token is required argument");
    }
    try {
        const response = await axios.get(`${API_URL}/reviews`, {
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
