import React from "react";
import { STATIC_TEXT } from "@/constants";
import { RegisterForm } from "@/components/app";

const RegisterPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-lg text-center font-medium">{STATIC_TEXT.TITLE}</h1>
      <h2 className="text-lg text-center font-bold">ACCOUNT REGISTRATION</h2>

      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
