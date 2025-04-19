import { AxiosError } from "axios";
import { httpClient } from "@/api";

export class BaseService {
  protected get http() {
    return httpClient;
  }

  protected handleError(error: AxiosError | unknown) {
    if (error instanceof AxiosError) {
      console.log("api-error", error);

      return;
    }

    console.log("not an api error");
  }
}
