import axios from "axios";
import { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const accessToken = null; //TODO attach access token from context

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
async function getCourses() {
    try {
        const response = await axios.get(`${API_URL}/courses`);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || axiosError.message;
    }
}

async function createCourse(payload: createCoursePayload) {
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
