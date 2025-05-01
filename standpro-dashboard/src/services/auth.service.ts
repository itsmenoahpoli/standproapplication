import { toast } from "react-toastify";
import { BaseService } from "./base.service";
import { useAuthStore } from "@/store";
import type { Credentials } from "@/types/auth";

export class AuthService extends BaseService {
  public async resetPassword(mobileNumber: string, password: string) {
    return await this.http
      .post("auth/reset-password", { mobile_number: mobileNumber, password })
      .then(() => {
        toast.success("Password has been reset successfully!");
        return true;
      })
      .catch((error) => {
        toast.error("INVALID MOBILE NUMBER");
        this.handleError(error);
      });
  }

  public async verifyMobileNumber(mobileNumber: string) {
    return await this.http
      .post("auth/verify-mobile-number", { mobile_number: mobileNumber })
      .then(() => {
        return true;
      })
      .catch((error) => {
        toast.error("INVALID MOBILE NUMBER");
        this.handleError(error);
      });
  }

  public async checkSystemUsers() {
    return await this.http
      .get("auth/check-users")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        toast.error("FAILED CHECKING SYSTEM USERS");
        this.handleError(error);
      });
  }

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
      .then(() => {
        toast.success("Account has been created successfully!");

        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 2000);
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;

          if (status === 422) {
            toast.error(
              "Registration failed: Email or username already exists"
            );
          } else {
            toast.error(
              `Registration failed: ${data.message || "An error occurred"}`
            );
          }
        } else {
          toast.error("Registration failed: Could not connect to the server");
        }

        this.handleError(error);
      });
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
