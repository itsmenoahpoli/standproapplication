import React from "react";
import { toast } from "react-toastify";
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { FiHome, FiInbox, FiSend, FiPieChart, FiLogOut } from "react-icons/fi";
import { useAuthHook } from "@/hooks/auth.hook";
import { useAuthStore } from "@/store";
import { APP_ROUTES } from "@/constants";
import FILES_LOGO from "@/assets/files-logo.jpeg";

const sidebarMenuItems = [
  {
    label: "Dashboard",
    icon: <FiHome size={20} />,
    url: "/dashboard",
  },
  {
    label: "Incoming",
    icon: <FiInbox size={20} />,
    url: "/dashboard/files/incoming",
  },
  {
    label: "Outgoing",
    icon: <FiSend size={20} />,
    url: "/dashboard/files/outgoing",
  },
  {
    label: "Reports",
    icon: <FiPieChart size={20} />,
    url: "/dashboard/files/reports",
  },
];

export const DashboardLayout: React.FC = () => {
  const { isAuthenticated } = useAuthHook();
  const { RESET_AUTH } = useAuthStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate(APP_ROUTES.AUTH_LOGIN);
      toast.warning("You must login to access the dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleRedirect = (url: string) => {
    return navigate(url);
  };

  const handleLogout = () => {
    RESET_AUTH();
    window.location.href = "/auth/login";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 shadow-lg">
        <div className="h-16 p-4 border-b border-gray-700"></div>
        <nav className="mt-6">
          {sidebarMenuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleRedirect(item.url)}
              className="w-full flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
            >
              <span className="text-gray-400">{item.icon}</span>
              <span className="ml-3 font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <Button
            color="light"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <FiLogOut size={18} />
            Logout
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
