import { AxiosError } from "axios";
import axiosInstance from "@/lib/axiosInstance";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserEnrollments(accessToken: string) {
    try {
        const response = await axiosInstance.get(
            `${API_URL}/enrollments/my-enrollments`,
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

export async function getIsEnrolledInCourse(courseId: string, accessToken: string) {
    if (!accessToken) throw new Error("Access token is required argument");
    try {
        const response = await axiosInstance.get(
            `${API_URL}/enrollments/is-enrolled/${courseId}`,
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