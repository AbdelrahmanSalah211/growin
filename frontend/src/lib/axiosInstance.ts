import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { refreshAccessToken } from "@/services/authService";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  skipAuthRefresh?: boolean;
}

let accessToken: string | null = null;
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: AxiosResponse) => void;
  reject: (error: AxiosError) => void;
  requestConfig: CustomAxiosRequestConfig;
}> = [];

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach(({ resolve, reject, requestConfig }) => {
    if (error) {
      reject(error);
    } else {
      requestConfig.headers = requestConfig.headers || {};
      requestConfig.headers.Authorization = `Bearer ${token}`;
      axiosInstance(requestConfig).then(resolve).catch(reject);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipAuthRefresh
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, requestConfig: originalRequest });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const data = await refreshAccessToken();
        accessToken = data.accessToken;

        processQueue(null, accessToken);

        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export default axiosInstance;
