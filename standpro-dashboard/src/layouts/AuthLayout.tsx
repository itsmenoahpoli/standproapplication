import React from "react";
import { Outlet } from "react-router-dom";
import { Card } from "flowbite-react";
import BRAND_LOGO from "@/assets/brand-logo.jpeg";

const currentYear = new Date().getFullYear();

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col justify-center items-center gap-y-3 p-4">
      <Card className="w-full max-w-md" style={{ zoom: 0.9 }}>
        <img
          src={BRAND_LOGO}
          alt="brand-logo"
          className="h-[80px] w-1/2 mx-auto mb-4"
        />
        <Outlet />
      </Card>
      <p className="text-xs text-center text-gray-300">
        &copy; {currentYear} All Rights Reserved.
      </p>
    </div>
  );
};
