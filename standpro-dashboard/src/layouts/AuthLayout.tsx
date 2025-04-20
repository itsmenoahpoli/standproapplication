import React from "react";
import { Outlet } from "react-router-dom";
import { Card } from "flowbite-react";

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col justify-center items-center gap-y-3 p-4">
      <Card className="w-full max-w-md" style={{ zoom: 0.9 }}>
        <Outlet />
      </Card>
      <p className="text-xs text-center text-gray-300">
        &copy; 2024 All Rights Reserved.
      </p>
    </div>
  );
};
