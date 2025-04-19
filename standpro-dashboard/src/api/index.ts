import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store";

const baseURL = import.meta.env.VITE_APP_API_BASEURL;

const instance: AxiosInstance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { token } = useAuthStore.getState();

    /**
     * Set Headers
     */
    config.headers["Accept"] = "application/json";
    // config.headers["Content-Type"] = "application/json";
    // config.headers["X-API-KEY"] = "secretkey";

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    if (error.response) {
      const { status } = error.response;

      if (status === 500) {
        console.error({
          message: "Error",
          description: "Server error occured!",
          trace: error,
        });
      }
    }

    return Promise.reject(error);
  }
);

export { instance as httpClient };
