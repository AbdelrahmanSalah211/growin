import { AxiosError } from "axios";
import axiosInstance from "@/lib/axiosInstance";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllCategories() {
    try {
        const response = await axiosInstance.get(
            `${API_URL}/course-categories`
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || axiosError.message;
    }
}

//! SHOULD BE REMOVED - no endpoint for creating categories
// export async function createCategory(title: string, accessToken: string) {
//     if (!accessToken || !title) {
//         throw new Error("Access token and title are required arguments");
//     }
//     if (!title) {
//         throw new Error("Title is required");
//     }
//     try {
//         const response = await axiosInstance.post(
//             `${API_URL}/course-categories`,
//             { title },
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
