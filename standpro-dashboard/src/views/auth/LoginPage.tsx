import React from "react";
import { STATIC_TEXT } from "@/constants";
import { LoginForm } from "@/components/app";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-lg text-center font-medium">{STATIC_TEXT.TITLE}</h1>
      <h2 className="text-lg text-center font-bold">LOG IN</h2>

      <LoginForm />
    </div>
  );
};

export default LoginPage;
