import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FcOpenedFolder } from "react-icons/fc";
import { Card, Button, Table, Tabs } from "flowbite-react";
import { FileReportsService } from "@/services";
import { FiEye, FiDownload } from "react-icons/fi";

const _fileReportsService = new FileReportsService();

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

interface Record {
  id: number;
  type: string;
  type_resource: string;
  date_received: string;
  time_released: string;
  date_letter: string;
  subject: string;
  from: string;
  agency: string;
  received_by: string;
  path: string;
}

interface DailyGroup {
  date: string;
  total: number;
  records: Record[];
}

interface MonthlyGroup {
  month: string;
  total: number;
  records: Record[];
}

interface YearlyGroup {
  year: number;
  total: number;
  records: Record[];
}

const FolderBrowser: React.FC<{
  type: string;
  files: DailyGroup[] | MonthlyGroup[] | YearlyGroup[];
}> = ({ type, files }) => {
  const handleDownload = (path: string) => {
    window.open(path, "_blank");
  };

  const renderFileTable = (records: Record[]) => (
    <div className="overflow-auto">
      <Table>
        <Table.Head className="sticky top-0 bg-white">
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Time</Table.HeadCell>
          <Table.HeadCell>Subject</Table.HeadCell>
          <Table.HeadCell>Type</Table.HeadCell>
          <Table.HeadCell>From</Table.HeadCell>
          <Table.HeadCell>Agency</Table.HeadCell>
          <Table.HeadCell>Received By</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {records.map((record) => (
            <Table.Row key={record.id} className="hover:bg-gray-50">
              <Table.Cell>{record.date_received || "N/A"}</Table.Cell>
              <Table.Cell>{record.time_released || "N/A"}</Table.Cell>
              <Table.Cell className="font-medium">{record.subject}</Table.Cell>
              <Table.Cell>
                <div className="flex gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.type === "incoming"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {record.type?.toUpperCase() || "N/A"}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {record.type_resource?.toUpperCase() || "N/A"}
                  </span>
                </div>
              </Table.Cell>
              <Table.Cell>{record.from || "N/A"}</Table.Cell>
              <Table.Cell>{record.agency || "N/A"}</Table.Cell>
              <Table.Cell>{record.received_by || "N/A"}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-2">
                  <a
                    href={record.path}
                    className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View"
                  >
                    <FiEye size={16} />
                  </a>
                  <button
                    onClick={() => handleDownload(record.path)}
                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                    title="Download"
                  >
                    <FiDownload size={16} />
                  </button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {/* Add empty div for bottom padding */}
      <div className="h-[100px]"></div>
    </div>
  );

  const formatMonthYear = (monthStr: string) => {
    if (!monthStr) return "N/A";

    const [year, month] = monthStr.split("-");
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleString(
      "default",
      {
        month: "long",
        year: "numeric",
      }
    );
  };

  const renderDailyView = () => {
    const dailyGroups = files as DailyGroup[];
    const totalRecords = dailyGroups.reduce(
      (sum, group) => sum + group.total,
      0
    );

    return (
      <div className="flex flex-col h-[calc(100vh-280px)]">
        <div className="bg-white border-b py-2">
          <span className="text-sm text-gray-500">
            Total records: {totalRecords}
          </span>
        </div>
        <div className="flex-1 overflow-auto pb-[100px]">
          {dailyGroups.length > 0 ? (
            dailyGroups.map((group, index) => (
              <div key={group.date}>
                <div className="sticky top-0 z-10 bg-gray-50 px-4 py-2 border-b">
                  <h3 className="text-sm font-medium text-gray-700">
                    {new Date(group.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    <span className="ml-2 text-gray-500">
                      ({group.total} records)
                    </span>
                  </h3>
                </div>
                {renderFileTable(group.records)}
                {/* Add spacing between groups except for the last one */}
                {index < dailyGroups.length - 1 && <div className="h-6" />}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              No records found
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMonthlyView = () => {
    return (
      <div className="flex flex-col h-full">
        <Tabs className="border-b border-gray-200">
          {(files as MonthlyGroup[]).map((group) => (
            <Tabs.Item key={group.month} title={formatMonthYear(group.month)}>
              <div className="flex flex-col h-[calc(100vh-280px)]">
                <div className="bg-white border-b py-2">
                  <span className="text-sm text-gray-500">
                    Total records: {group.total}
                  </span>
                </div>
                <div className="flex-1 overflow-auto pb-[100px]">
                  {renderFileTable(group.records)}
                </div>
              </div>
            </Tabs.Item>
          ))}
        </Tabs>
      </div>
    );
  };

  const renderYearlyView = () => {
    const yearlyGroups = files as YearlyGroup[];

    if (!Array.isArray(yearlyGroups) || yearlyGroups.length === 0) {
      return (
        <div className="text-center text-gray-500 py-8">No records found</div>
      );
    }

    return (
      <div className="flex flex-col h-full">
        <Tabs className="border-b border-gray-200">
          {yearlyGroups.map((group) =>
            group?.year ? (
              <Tabs.Item key={group.year} title={group.year.toString()}>
                <div className="flex flex-col h-[calc(100vh-280px)]">
                  <div className="bg-white border-b py-2">
                    <span className="text-sm text-gray-500">
                      Total records: {group.total || 0}
                    </span>
                  </div>
                  <div className="flex-1 overflow-auto pb-[100px]">
                    {renderFileTable(group.records || [])}
                  </div>
                </div>
              </Tabs.Item>
            ) : null
          )}
        </Tabs>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-6rem)]">
      <Card className="h-full">
        <div className="flex flex-col h-full">
          <div className="bg-white pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {type.charAt(0).toUpperCase() + type.slice(1)} Records
            </h2>
          </div>
          <div className="flex-1">
            {type === "daily" && renderDailyView()}
            {type === "monthly" && renderMonthlyView()}
            {type === "yearly" && renderYearlyView()}
            {type !== "daily" && type !== "monthly" && type !== "yearly" && (
              <div className="text-center text-gray-500 py-8">
                {type.charAt(0).toUpperCase() + type.slice(1)} view is not
                implemented yet
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

const FilesReportsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [files, setFiles] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const selectedType = searchParams.get("type");

  const handleFetchFilesByCategory = async (category: string) => {
    try {
      setIsLoading(true);
      const data = await _fileReportsService.getFilesByCategory(
        category as any
      );
      setFiles(data);
    } catch (error) {
      console.error("Error fetching files:", error);
      setFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = (type: string) => {
    setSearchParams({ type });
  };

  // Fetch data when component mounts or when selectedType changes
  React.useEffect(() => {
    if (selectedType) {
      handleFetchFilesByCategory(selectedType);
    }
  }, [selectedType]);

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
        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-lg font-medium text-gray-600">
                Loading data...
              </div>
            </div>
          ) : (
            <FolderBrowser type={selectedType || ""} files={files} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FilesReportsPage;
