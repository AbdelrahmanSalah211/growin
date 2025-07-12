import axios from "axios";
import { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const accessToken = null; //TODO attach access token from context

export interface LoginPayload {
    identifier: string;
    password: string;
}

export interface SignupPayload {
    username: string;
    email: string;
    password: string;
    profileImage?: string;
    imageDeleteURL?: string;
    bio?: string;
}

export async function login(payload: LoginPayload) {
    if (!payload.identifier || !payload.password) {
        throw new Error("Identifier and password are required");
    }
    try {
        const response = await axios.post(`${API_URL}/auth/login`, payload, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || axiosError.message;
    }
}

export async function signup(payload: SignupPayload) {
    if (!payload.username || !payload.email || !payload.password) {
        throw new Error("Username, email, and password are required");
    }
    const response = await axios.post(`${API_URL}/auth/signup`, payload, {
        withCredentials: true,
    });

    return response.data;
}

export async function refreshAccessToken() {
    try {
        const response = await axios.post(`${API_URL}/auth/refresh`, null, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || axiosError.message;
    }
}

export async function logout() {
    const res = await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );
    return res.data;
}

export function googleLogin() {
    window.open(`${API_URL}/auth/google`, "_blank");
}
