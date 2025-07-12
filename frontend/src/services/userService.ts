import axios from "axios";
import { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const accessToken = null; //TODO attach access token from context

export interface updateInfoPayload {
    username: string;
    email: string;
    profileImage?: string;
    imageDeleteURL?: string;
    bio?: string;
}

export interface updatePassword {
    currentPassword: string;
    newPassword: string;
}

export async function getUserInfo() {
    try {
        const response = await axios.get(`${API_URL}/users/info`, {
            withCredentials: true,
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

export async function updateUserInfo(payload: updateInfoPayload) {
    try {
        const response = await axios.patch(`${API_URL}/users/info`, payload, {
            withCredentials: true,
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

export async function updatePassword(payload: updatePassword) {
    try {
        const response = await axios.patch(
            `${API_URL}/users/password`,
            payload,
            {
                withCredentials: true,
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

export async function createPassword(payload: { password: string }) {
    if (!payload.password) {
        throw new Error("Password is required");
    }
    try {
        const response = await axios.patch(
            `${API_URL}/users/create-password`,
            payload,
            {
                withCredentials: true,
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

export async function forgetPassword(email: string) {
    try {
        const response = await axios.post(
            `${API_URL}/users/forget-password`,
            { email },
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || axiosError.message;
    }
}

export async function resetPassword(
    token: string
): Promise<{ message: string }> {
    try {
        const response = await axios.patch(
            `${API_URL}/users/reset-password`,
            { token },
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || axiosError.message;
    }
}

export async function switchUserMode() {
    try {
        const response = await axios.patch(
            `${API_URL}/users/user-mode`,
            {},
            {
                withCredentials: true,
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
