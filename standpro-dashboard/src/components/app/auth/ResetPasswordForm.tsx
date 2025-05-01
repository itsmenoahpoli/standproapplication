import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "@/services";

const _authService = new AuthService();

export const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mobile_number: "",
      password: "",
      confirm_password: "",
    },
  });

  const password = watch("password");

  const [verified, setVerified] = React.useState(false);

  const onFormSubmit = handleSubmit(async (formData) => {
    try {
      const result = await _authService.verifyMobileNumber(
        formData.mobile_number
      );
      if (result) {
        setVerified(true);
      }
      return result;
    } catch (error) {
      return false;
    }
  });

  const onUpdatePasswordSubmit = handleSubmit(async (formData) => {
    try {
      const result = await _authService.resetPassword(
        formData.mobile_number,
        formData.password
      );
      if (result) {
        navigate("/auth/login");
      }
      return result;
    } catch (error) {
      return false;
    }
  });

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <form
        className="flex flex-col gap-y-4 w-full"
        onSubmit={!verified ? onFormSubmit : onUpdatePasswordSubmit}
      >
        {!verified ? (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              className="w-full p-2.5 text-sm md:text-base rounded-lg border border-gray-300"
              placeholder="Please enter registered mobile number"
              {...register("mobile_number")}
              autoFocus
              required
            />
          </div>
        ) : (
          <>
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              <p className="text-sm font-medium">
                Mobile number verified successfully. Please set your new
                password.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="password"
                className="w-full p-2.5 text-sm md:text-base rounded-lg border border-gray-300"
                placeholder="New Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                autoFocus
                required
              />
              {errors.password && (
                <small className="text-red-500">
                  {errors.password.message}
                </small>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <input
                type="password"
                className="w-full p-2.5 text-sm md:text-base rounded-lg border border-gray-300"
                placeholder="Confirm New Password"
                {...register("confirm_password", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                required
              />
              {errors.confirm_password && (
                <small className="text-red-500">
                  {errors.confirm_password.message}
                </small>
              )}
            </div>
          </>
        )}

        <Button color="blue" type="submit" className="w-full">
          {verified ? "Reset Password" : "Verify"}
        </Button>
      </form>

      <div className="text-center">
        <Link
          to="/auth/login"
          className="text-sm md:text-base text-blue-600 hover:text-blue-800"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
};
