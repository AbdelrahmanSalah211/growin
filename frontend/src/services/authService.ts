import axios from "axios";
import { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
    const response = await axios.post(`${API_URL}/auth/login`, payload);

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
  const response = await axios.post(`${API_URL}/auth/signup`, payload);

  return response.data;
}

export async function refreshAccessToken() {
  try {
    const response = await axios.post(`${API_URL}/auth/refresh`, null);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data || axiosError.message;
  }
}

export async function logout(accessToken: string | null) {
  if (!accessToken) return;
  const res = await axios.post(
    `${API_URL}/auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data;
}

export function googleLogin(): Promise<{ accessToken: string; user: any }> {
  return new Promise((resolve, reject) => {
    const popup = window.open(
      `${API_URL}/auth/google`,
      "_blank",
      "width=500,height=600"
    );

    if (!popup) {
      reject(new Error("Failed to open popup window"));
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      // Optional: check origin here
      if (event.origin !== API_URL) return;
      
      const { accessToken, user } = event.data;

      popup.close();
      window.removeEventListener("message", handleMessage);
      resolve({ accessToken, user });
    };

    window.addEventListener("message", handleMessage);
  });
}



