import { AxiosError } from "axios";
import axiosInstance from "@/lib/axiosInstance";

import { getAccessToken } from "@/stores/authStore";
import { ICourse } from "@/interfaces/ICourse";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CreateCourseDto {
    title: string;
    description: string;
    language: string;
    level: "beginner" | "intermediate" | "advanced";
    price: string;
    courseCategoryId: string;
    file: File;
}

export async function getCourses(id?: number) {
    try {
        const url = id ? `${API_URL}/courses/${id}` : `${API_URL}/courses`;
        const response = await axiosInstance.get(`${url}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || axiosError.message;
    }
}
export const publishCourse = async (
    courseId: number
): Promise<{ message: string }> => {
    const accessToken = getAccessToken();

    try {
        const response = await axiosInstance.patch(
            `/courses/publish/${courseId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error publishing course:", error);
        throw error;
    }
};

export async function createCourse(payload: CreateCourseDto) {
    const accessToken = getAccessToken();
    console.log(accessToken);
    const formData = new FormData();
    console.log("catID", payload.courseCategoryId);
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("language", payload.language);
    formData.append("level", payload.level);
    formData.append("price", payload.price);
    formData.append("courseCategoryId", payload.courseCategoryId);
    formData.append("file", payload.file);

    try {
        const response = await axiosInstance.post(
            `${API_URL}/courses`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || axiosError.message;
    }
}

export async function getCourseById(id: string) {
    try {
        const response = await axiosInstance.get(`${API_URL}/courses/${id}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || axiosError.message;
    }
}

// export async function createCourse(
//     accessToken: string,
//     payload: createCoursePayload
// ) {
//     try {
//         const response = await axiosInstance.post(
//             `${API_URL}/courses`,
//             payload,
//             {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }
//         );
//         return response.data;
//     } catch (error) {
//         const axiosError = error as AxiosError;
//         throw axiosError.response?.data || axiosError.message;
//     }
// }

export async function searchCourse(queryparams?: string) {
    try {
        const url = `${API_URL}/courses/search?${queryparams}`;

        const response = await axiosInstance.get(`${url}`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || axiosError.message;
    }
}

export async function updateCourse(
    courseId: number,
    formData: FormData
): Promise<ICourse> {
    const accessToken = getAccessToken();
    try {
        const response = await axiosInstance.patch(
            `${API_URL}/courses/${courseId}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || axiosError.message;
    }
}

export async function getInstructorCourses(): Promise<ICourse[]> {
    const accessToken = getAccessToken();
    try {
        const response = await axiosInstance.get(
            `${API_URL}/courses/instructor`,
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

export const deleteCourse = async (courseId: number): Promise<void> => {
    const accessToken = getAccessToken();

    try {
        await axiosInstance.delete(`/courses/${courseId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || axiosError.message;
    }
};
