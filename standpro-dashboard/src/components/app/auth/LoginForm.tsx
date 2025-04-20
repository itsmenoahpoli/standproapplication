import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { AuthService } from "@/services";
import type { Credentials } from "@/types/auth";

const _authService = new AuthService();

export const LoginForm: React.FC = () => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = handleSubmit(async (formData) => {
    return _authService.authenticateCredentials(formData as Credentials);
  });

  return (
    <div className="flex flex-col gap-y-4 w-full">
      <form className="flex flex-col gap-y-4 w-full" onSubmit={onFormSubmit}>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            className="w-full p-2.5 text-sm md:text-base rounded-lg border border-gray-300"
            placeholder="Please enter your e-mail"
            {...register("email")}
            autoFocus
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="password"
            className="w-full p-2.5 text-sm md:text-base rounded-lg border border-gray-300"
            placeholder="Please enter your password"
            {...register("password")}
            required
          />
        </div>

        <Button color="blue" type="submit" className="w-full">
          Log In
        </Button>
      </form>

      <div className="text-center">
        <Link
          to="/auth/register"
          className="text-sm md:text-base text-blue-600 hover:text-blue-800"
        >
          Don't have an account? Register here
        </Link>
      </div>
    </div>
  );
};
