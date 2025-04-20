import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "flowbite-react";

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
      username: "",
      password: "",
      confirm_password: "",
    },
  });

  const password = watch("password");

  const onFormSubmit = handleSubmit(async (formData) => {
    console.log(formData);
  });

  return (
    <form className="flex flex-col gap-y-3" onSubmit={onFormSubmit}>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          className="w-full text-sm rounded-lg border border-gray-300"
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
          className="w-full text-sm rounded-lg border border-gray-300"
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
          className="w-full text-sm rounded-lg border border-gray-300"
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
          className="w-full text-sm rounded-lg border border-gray-300"
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
          className="w-full text-sm rounded-lg border border-gray-300"
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
          className="w-full text-sm rounded-lg border border-gray-300"
          placeholder="Confirm Password"
          {...register("confirm_password", {
            required: "Please confirm your password",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.confirm_password && (
          <small className="text-red-500">
            {errors.confirm_password.message}
          </small>
        )}
      </div>

      <Button color="blue" type="submit">
        Register
      </Button>
    </form>
  );
};
