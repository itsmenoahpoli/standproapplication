import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import { RecordLogsService } from "@/services";
import { RecordLogForm } from "@/components/app";

type Params = {
  id?: string;
};

const _recordLogsService = new RecordLogsService();

const FilesRecordLogFormPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams<Params>();
  const params = new URLSearchParams(location.search);
  const formType = params.get("type") as "incoming" | "outgoing";

  const [formData, setFormData] = React.useState<any>(null);

  const fetchData = async () => {
    if (id)
      await _recordLogsService
        .getRecordLog(+id)
        .then((data) => setFormData(data));
  };

  React.useEffect(() => {
    if (id) {
      fetchData();
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-3 pb-[50px]">
      <nav className="py-4">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
        >
          ← Back to list
        </button>
      </nav>

      <h1 className="text-2xl font-medium uppercase">
        {formType} RECORD LOG SHEET FORM
      </h1>

      <Card className="w-3/4">
        <RecordLogForm type={formType} data={formData} />
      </Card>
    </div>
  );
};

export default FilesRecordLogFormPage;
