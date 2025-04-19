import React from "react";
import { Outlet } from "react-router-dom";
import { Card } from "flowbite-react";

export const AuthLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen bg-slate-900 flex flex-col justify-center items-center gap-y-3">
      <Card className="w-1/5 max-md:w-3/4" style={{ zoom: 0.9 }}>
        <Outlet />
      </Card>
      <p className="text-xs text-center text-gray-900">&copy; 2024 All Rights Reserved.</p>
    </div>
  );
};
