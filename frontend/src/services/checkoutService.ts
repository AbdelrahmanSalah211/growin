import { AxiosError } from "axios";
import axiosInstance from "@/lib/axiosInstance";

import { getAccessToken } from "@/stores/authStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const checkout = async (
    accessToken: string
): Promise<{ redirect_url: string }> => {
    const res = await axiosInstance.post(
        "/checkout",
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return res.data;
};
