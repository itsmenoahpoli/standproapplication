import { toast } from "react-toastify";
import { BaseService } from "./base.service";
import { useAuthStore } from "@/store";
import type { Credentials } from "@/types/auth";

export class AuthService extends BaseService {
  public async authenticateCredentials(credentials: Credentials) {
    return await this.http
      .post("auth/login", credentials)
      .then((response) => {
        const { SET_USER, SET_TOKEN } = useAuthStore.getState();
        const { user, token } = response.data;

        SET_USER(user);
        SET_TOKEN(token);

        window.location.href = "/dashboard";
      })
      .catch((error) => {
        toast.error("INVALID CREDENTIALS");
        this.handleError(error);
      });
  }

  public async registerCredentials(credentials: any) {
    credentials.name = `${credentials.first_name} ${credentials.last_name}`;

    return await this.http
      .post("auth/register", credentials)
      .then((response) => {
        console.log(response.status);
        toast.success("Account has been created");

        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 2000);
      })
      .catch((error) => this.handleError(error));
  }

  public async unauthenticateCredentials() {
    return await this.http
      .post("auth/logout")
      .then(() => {
        const { RESET_AUTH } = useAuthStore.getState();

        RESET_AUTH();

        window.location.href = "/login";
      })
      .catch((error) => this.handleError(error));
  }
}
