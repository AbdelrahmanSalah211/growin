import axios from "axios";
import { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAllCategories(accessToken: string) {
    if (!accessToken) {
        throw new Error("Access token is required argument");
    }
    try {
        const response = await axios.get(`${API_URL}/courseCategories`, {
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

export async function createCategory(title: string, accessToken: string) {
    if (!accessToken || !title) {
        throw new Error("Access token and title are required arguments");
    }
    if (!title) {
        throw new Error("Title is required");
    }
    try {
        const response = await axios.post(
            `${API_URL}/courseCategories`,
            { title },
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
