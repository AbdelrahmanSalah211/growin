import axios from "axios";
import { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export enum LessonType {
    VIDEO = "video",
    DOCUMENT = "document",
    QUIZ = "quiz",
}
export interface createLessonPayload {
    courseId: number;
    title: string;
    lessonType: LessonType;
    subTitle: string;
    position: number;
    section: string;
}

export async function createLesson(
    lesson: createLessonPayload,
    accessToken: string
) {
    if (!lesson) throw new Error("Lesson is required argument");
    if (!accessToken) throw new Error("Access token is required argument");

    try {
        const response = await axios.post(`${API_URL}/lessons`, lesson, {
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

export async function createBulkLessons(
    lessons: createLessonPayload[],
    accessToken: string
) {
    if (!lessons || !Array.isArray(lessons) || lessons.length === 0) {
        throw new Error("Lessons array is required and cannot be empty");
    }
    if (!accessToken) throw new Error("Access token is required argument");

    try {
        const response = await axios.post(`${API_URL}/lessons/bulk`, lessons, {
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

export async function getAllLessons(accessToken: string) {
    if (!accessToken) throw new Error("Access token is required argument");
    try {
        const response = await axios.get(`${API_URL}/lessons`, {
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

export async function getLessonById(id: string, accessToken: string) {
    if (!id) throw new Error("Lesson ID is required argument");
    if (!accessToken) throw new Error("Access token is required argument");

    try {
        const response = await axios.get(`${API_URL}/lessons/${id}`, {
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

export async function updateLesson(
    id: string,
    lesson: Partial<createLessonPayload>,
    accessToken: string
) {
    if (!id) throw new Error("Lesson ID is required argument");
    if (!lesson) throw new Error("Lesson data is required argument");
    if (!accessToken) throw new Error("Access token is required argument");

    try {
        const response = await axios.patch(`${API_URL}/lessons/${id}`, lesson, {
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
export async function getLessonsByCourseId(
    courseId: number,
    accessToken: string
) {
    if (!courseId) throw new Error("Course ID is required argument");
    if (!accessToken) throw new Error("Access token is required argument");

    try {
        const response = await axios.get(
            `${API_URL}/lessons/courseId/${courseId}`,
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

export async function uploadVideo(
    file: File,
    lessonId: string,
    accestToken: string
) {
    if (!file) throw new Error("File is required argument");
    if (!lessonId) throw new Error("Lesson ID is required argument");
    if (!accestToken) throw new Error("Access token is required argument");

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(
            `${API_URL}/lessons/video/${lessonId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${accestToken}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || axiosError.message;
    }
}
