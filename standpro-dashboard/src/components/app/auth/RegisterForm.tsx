import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { AuthService } from "@/services";

const _authService = new AuthService();

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@domain.com",
      username: "johndoe",
      password: "password",
      confirm_password: "password",
    },
  });

  const password = watch("password");

  const onFormSubmit = handleSubmit(async (formData) => {
    return _authService.registerCredentials(formData as any);
  });

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <form className="flex flex-col gap-y-4 w-full" onSubmit={onFormSubmit}>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="w-full p-2.5 text-sm md:text-base rounded-lg border border-gray-300"
            placeholder="First Name"
            {...register("first_name", { required: "First name is required" })}
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
            {...register("last_name", { required: "Last name is required" })}
          />
          {errors.last_name && (
            <small className="text-red-500">{errors.last_name.message}</small>
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
                message: "Invalid email address",
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
            {...register("username", { required: "Username is required" })}
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
            {...register("password", { required: "Password is required" })}
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
