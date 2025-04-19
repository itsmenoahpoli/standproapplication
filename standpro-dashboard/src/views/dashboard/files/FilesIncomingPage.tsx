import React from "react";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button, Card, Table } from "flowbite-react";
import { FiPlusCircle, FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { RecordLogsService } from "@/services";
import { RecordLog } from "@/types/models";
import FILES_LOGO from "@/assets/files-logo.jpeg";

const _recordLogsService = new RecordLogsService();

const FilesIncomingPage: React.FC = () => {
  const [list, setList] = React.useState<any>([]);
  const [search, setSearch] = React.useState<string>("");

  const { isLoading, refetch } = useQuery({
    queryKey: ["record-logs-incoming-data"],
    queryFn: async () => {
      return _recordLogsService.getRecordLogsList("incoming").then((data) => {
        setList(data);
        return data;
      });
    },
  });

  const handleDelete = async (id: number) => {
    if (confirm("Confirm to delete this record?")) {
      await _recordLogsService.deleteRecordLog(id).then(() => refetch());
    }
  };

  const handleSearch = (searchVal: string) => {
    setSearch(searchVal);

    if (!searchVal) {
      return refetch();
    }

    const filteredList = list.filter((item: any) => {
      return item.subject.toLowerCase().includes(searchVal.toLowerCase());
    });

    setList(filteredList);
  };

  const getFileSrc = (path: string) => {
    return `http://localhost:8000/assets/get?path=${path}`;
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="py-4">
        <Link
          to="/dashboard"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
        >
          ← Back to Dashboard
        </Link>
      </nav>

      {/* Header Section */}
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-7">
        Record Log Sheet for Incoming Communication
      </h1>

      {/* Actions Bar */}
      <div className="mb-6 flex justify-between items-center">
        <Link to="/dashboard/files/form?type=incoming">
          <Button
            color="light"
            className="flex items-center gap-2 hover:bg-gray-100"
          >
            <FiPlusCircle className="h-5 w-5" />
            Add New Record
          </Button>
        </Link>

        <div className="w-72">
          <input
            type="text"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Search by subject..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-lg font-medium text-gray-600">
              Loading data...
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table className="w-full">
              <Table.Head>
                <Table.HeadCell>Date Received</Table.HeadCell>
                <Table.HeadCell>Time Released</Table.HeadCell>
                <Table.HeadCell>Date Letter</Table.HeadCell>
                <Table.HeadCell>Subject</Table.HeadCell>
                <Table.HeadCell>From</Table.HeadCell>
                <Table.HeadCell>Agency</Table.HeadCell>
                <Table.HeadCell>Received By</Table.HeadCell>
                <Table.HeadCell>Folder Name</Table.HeadCell>
                <Table.HeadCell>Resource</Table.HeadCell>
                <Table.HeadCell>Actions</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {!list.length ? (
                  <Table.Row>
                    <Table.Cell
                      colSpan={10}
                      className="text-center py-8 text-gray-500"
                    >
                      No records found
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  list.map((d: RecordLog) => (
                    <Table.Row key={d.id} className="hover:bg-gray-50">
                      <Table.Cell>{d.date_received}</Table.Cell>
                      <Table.Cell>{d.time_released}</Table.Cell>
                      <Table.Cell>{d.date_letter}</Table.Cell>
                      <Table.Cell className="font-medium">
                        {d.subject}
                      </Table.Cell>
                      <Table.Cell>{d.from}</Table.Cell>
                      <Table.Cell>{d.agency}</Table.Cell>
                      <Table.Cell>{d.received_by}</Table.Cell>
                      <Table.Cell>{d.name_of_folder}</Table.Cell>
                      <Table.Cell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {d.type_resource?.toUpperCase()}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/dashboard/files/form/${d.id}/edit?type=incoming`}
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <FiEdit size={16} />
                          </Link>
                          <a
                            href={getFileSrc(d.path!)}
                            className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View"
                          >
                            <FiEye size={16} />
                          </a>
                          <button
                            onClick={() => handleDelete(d.id)}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default FilesIncomingPage;
