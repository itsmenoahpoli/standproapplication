import { AxiosError } from "axios";
import { httpClient } from "@/api";

export class BaseService {
  protected get http() {
    return httpClient;
  }

  protected handleError(error: AxiosError | unknown) {
    if (error instanceof AxiosError) {
      console.log("api-error", error);

      // Log detailed error information to console for debugging
      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        console.log("Headers:", error.response.headers);
      } else if (error.request) {
        console.log("Request was made but no response received", error.request);
      } else {
        console.log("Error setting up request:", error.message);
      }

      return;
    }
  }
}
