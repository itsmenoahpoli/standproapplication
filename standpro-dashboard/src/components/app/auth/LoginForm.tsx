import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "flowbite-react";
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
    <form className="flex flex-col gap-y-3" onSubmit={onFormSubmit}>
      <input
        type="email"
        className="w-full text-sm rounded-lg border border-gray-300"
        placeholder="Please enter your e-mail"
        {...register("email")}
        autoFocus
        required
      />
      <input
        type="password"
        className="w-full text-sm rounded-lg border border-gray-300"
        placeholder="Please enter your password"
        {...register("password")}
        required
      />

      <Button color="blue" type="submit">
        Log In
      </Button>
    </form>
  );
};
