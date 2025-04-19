import React from "react";
import { useNavigate } from "react-router-dom";
import { FiInbox, FiSend, FiPieChart } from "react-icons/fi";

const dashboardItems = [
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

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = (url: string) => {
    return navigate(url);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dashboardItems.map((item) => (
        <div
          key={item.label}
          className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleRedirect(item.url)}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                {item.label}
              </h3>
              <p className="text-sm text-gray-500">
                View {item.label.toLowerCase()} records
              </p>
            </div>
            <div className="text-gray-400">{item.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
