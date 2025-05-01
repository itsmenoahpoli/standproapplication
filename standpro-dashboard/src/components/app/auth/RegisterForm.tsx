import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { AuthService } from "@/services";
import { toast } from "react-toastify";

const _authService = new AuthService();

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile_number: "",
      username: "",
      password: "",
      confirm_password: "",
    },
    mode: "onSubmit",
  });

  const password = watch("password");

  const displayValidationErrors = (errors: any) => {
    const errorMessages = Object.values(errors).map(
      (error: any) => error.message
    );

    if (errorMessages.length > 0) {
      toast.error(
        <div>
          <strong>Please fix the following errors:</strong>
          <ul className="mt-2 list-disc pl-4">
            {errorMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };

  const checkFormErrors = () => {
    if (Object.keys(errors).length > 0) {
      displayValidationErrors(errors);
      return true;
    }
    return false;
  };

  const onFormSubmit = handleSubmit(
    async (formData) => {
      if (checkFormErrors()) return;

      const loadingToast = toast.loading("Creating your account...");

      try {
        await _authService.registerCredentials(formData as any);
        toast.dismiss(loadingToast);
      } catch (error) {
        toast.dismiss(loadingToast);
      }
    },
    (errors) => {
      // This function runs when validation fails
      displayValidationErrors(errors);
    }
  );

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <form className="flex flex-col gap-y-4 w-full" onSubmit={onFormSubmit}>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="w-full p-2.5 text-sm md:text-base rounded-lg border border-gray-300"
            placeholder="First Name"
            {...register("first_name", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
            })}
          />
          {errors.first_name && (
            <small className="text-red-500">{errors.first_name.message}</small>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="w-full p-2.5 text-sm md:text-base rounded-lg border border-gray-300"
            placeholder="Last Name"
            {...register("last_name", {
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters",
              },
            })}
          />
          {errors.last_name && (
            <small className="text-red-500">{errors.last_name.message}</small>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="tel"
            className="w-full p-2.5 text-sm md:text-base rounded-lg border border-gray-300"
            placeholder="Mobile Number"
            {...register("mobile_number", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9+\-\s()]*$/,
                message: "Invalid mobile number format",
              },
            })}
          />
          {errors.mobile_number && (
            <small className="text-red-500">
              {errors.mobile_number.message}
            </small>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="email"
            className="w-full p-2.5 text-sm md:text-base rounded-lg border border-gray-300"
            placeholder="Email Address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address format",
              },
            })}
          />
          {errors.email && (
            <small className="text-red-500">{errors.email.message}</small>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="w-full p-2.5 text-sm md:text-base rounded-lg border border-gray-300"
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message:
                  "Username can only contain letters, numbers and underscores",
              },
            })}
          />
          {errors.username && (
            <small className="text-red-500">{errors.username.message}</small>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="password"
            className="w-full p-2.5 text-sm md:text-base rounded-lg border border-gray-300"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <small className="text-red-500">{errors.password.message}</small>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            type="password"
            className="w-full p-2.5 text-sm md:text-base rounded-lg border border-gray-300"
            placeholder="Confirm Password"
            {...register("confirm_password", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.confirm_password && (
            <small className="text-red-500">
              {errors.confirm_password.message}
            </small>
          )}
        </div>

        <Button color="blue" type="submit" className="w-full">
          Register
        </Button>
      </form>

      <div className="text-center">
        <Link
          to="/auth/login"
          className="text-sm md:text-base text-blue-600 hover:text-blue-800"
        >
          Already have an account? Login here
        </Link>
      </div>
    </div>
  );
};
