import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FcOpenedFolder } from "react-icons/fc";
import { Card, Button } from "flowbite-react";

const reportCategories = [
  {
    label: "DAILY",
    type: "daily",
    description: "View and manage daily communication records",
  },
  {
    label: "MONTHLY",
    type: "monthly",
    description: "Access monthly communication summaries",
  },
  {
    label: "YEARLY",
    type: "yearly",
    description: "Review annual communication archives",
  },
];

const FolderBrowser: React.FC<{ type: string }> = ({ type }) => {
  return (
    <div className="h-full">
      <Card className="h-full">
        <div className="flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            {type.charAt(0).toUpperCase() + type.slice(1)} Records
          </h2>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>
      </Card>
    </div>
  );
};

const FilesReportsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedType = searchParams.get("type");

  const handleCategorySelect = (type: string) => {
    setSearchParams({ type });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Breadcrumb */}
      <nav className="p-6 pb-0">
        <Link
          to="/dashboard"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
        >
          ← Back to Dashboard
        </Link>
      </nav>

      <div className="flex gap-6 p-6 flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0">
          <Card>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Records Management
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Select a time period to view records
              </p>
            </div>

            <div className="flex flex-col gap-y-2">
              {reportCategories.map((category) => (
                <Button
                  key={`btn-${category.label}`}
                  color="light"
                  className={`w-full flex justify-start p-4 transition-colors ${
                    selectedType === category.type
                      ? "border-2 border-blue-500"
                      : "border border-gray-200"
                  }`}
                  onClick={() => handleCategorySelect(category.type)}
                >
                  <div className="flex items-center gap-3">
                    <FcOpenedFolder size={24} />
                    <div className="text-left">
                      <div className="font-medium">{category.label}</div>
                      <div className="text-xs text-gray-600">
                        {category.description}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1 h-full">
          {selectedType ? (
            <FolderBrowser type={selectedType} />
          ) : (
            <Card className="h-full flex items-center justify-center text-gray-500">
              Select a category from the sidebar to view records
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilesReportsPage;
