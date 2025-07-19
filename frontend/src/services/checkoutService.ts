import axiosInstance from "@/lib/axiosInstance";

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
