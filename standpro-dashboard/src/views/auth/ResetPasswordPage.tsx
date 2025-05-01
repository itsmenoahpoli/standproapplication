import React from "react";
import { STATIC_TEXT } from "@/constants";
import { ResetPasswordForm } from "@/components/app";

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-lg text-center font-medium">{STATIC_TEXT.TITLE}</h1>
      <h2 className="text-lg text-center font-bold">RESET PASSWORD</h2>

      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
