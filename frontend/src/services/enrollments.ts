import { AxiosError } from "axios";
import axiosInstance from "@/lib/axiosInstance";

import { getAccessToken } from "@/stores/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function checkEnrollment(courseId: number) {
    const accessToken = getAccessToken();

    try {
        const response = await axiosInstance.get(
            `${API_URL}/enrollments/is-enrolled/${courseId}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return response.data.enrolled as boolean;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || axiosError.message;
    }
}
