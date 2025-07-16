import { AxiosError } from "axios";
import axiosInstance from "@/lib/axiosInstance";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface updateInfoPayload {
    username?: string;
    email?: string;
    profileImage?: string;
    imageDeleteURL?: string;
    isPasswordPresent?: boolean;
    bio?: string;
}

export interface updatePassword {
    currentPassword: string;
    newPassword: string;
}

export async function getUserInfo(accessToken: string) {
    try {
        const response = await axiosInstance.get(`${API_URL}/users/info`, {
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

export async function updateUserInfo(
    payload: updateInfoPayload,
    accessToken: string
) {
    try {
        const response = await axiosInstance.patch(
            `${API_URL}/users/info`,
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

export async function updatePassword(
    payload: updatePassword,
    accessToken: string
) {
    try {
        const response = await axiosInstance.patch(
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

export async function createPassword(
    payload: { password: string },
    accessToken: string
) {
    if (!payload.password) {
        throw new Error("Password is required");
    }
    try {
        const response = await axiosInstance.patch(
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
        const response = await axiosInstance.post(
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
    token: string,
    newPassword: string
): Promise<{ message: string }> {
    try {
        const response = await axiosInstance.patch(
            `${API_URL}/users/reset-password`,
            { token, newPassword },
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

export async function switchUserMode(accessToken: string) {
    try {
        const response = await axiosInstance.patch(
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
