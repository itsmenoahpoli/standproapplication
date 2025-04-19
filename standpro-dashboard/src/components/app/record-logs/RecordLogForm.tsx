import React from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Button } from "flowbite-react";
import { RecordLogsService } from "@/services";
import type { RecordLog } from "@/types/models";

type Props = {
  type: "incoming" | "outgoing";
  data?: any;
};

const _recordLogsService = new RecordLogsService();

export const RecordLogForm: React.FC<Props> = (props) => {
  const fileInputRef = React.useRef(null);
  const { handleSubmit, register, setValue } = useForm<RecordLog>();

  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);

  const resetForm = () => {
    document.querySelector("form")?.reset();
  };

  const handleCreate = async (data: any) => {
    await _recordLogsService.createRecordLog(data, resetForm);
  };

  const handleUpdate = async (data: any) => {
    await _recordLogsService.updateRecordLog(props.data.id, data);
  };

  const handleFormSubmit = handleSubmit(async (formData) => {
    if (props.data) {
      formData.type = props.type;
      return handleUpdate(formData);
    } else {
      formData.type = props.type;
      formData.file = uploadedFile;
      return handleCreate(formData);
    }
  });

  const handleFileUpload = (file: File) => {
    if (file) {
      if (file.type !== "application/pdf") {
        if (fileInputRef.current) {
          // @ts-ignore
          fileInputRef.current.value = ""; // Reset the input field
        }

        toast.error("Only PDF file is accepted");

        return;
      }

      setUploadedFile(file);
    }
  };

  React.useEffect(() => {
    if (props.data) {
      Object.keys(props.data).forEach((key: any) =>
        setValue(key, props.data[key])
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-2">
        <small>Time of Release</small>
        <input
          type="time"
          placeholder="Time Released"
          defaultValue={format(new Date(), "HH:mm")}
          {...register("time_released")}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <small>Date Received</small>
        <input
          type="date"
          placeholder="Date Received"
          {...register("date_received")}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <small>Date of Letter</small>
        <input
          placeholder="Date Letter"
          {...register("date_letter")}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <small>Subject</small>
        <input placeholder="Subject" {...register("subject")} required />
      </div>
      <div className="flex flex-col gap-2">
        <small>From</small>
        <input placeholder="From" {...register("from")} required />
      </div>
      <div className="flex flex-col gap-2">
        <small>Agency</small>
        <input placeholder="Agency" {...register("agency")} required />
      </div>
      <div className="flex flex-col gap-2">
        <small>Person Who Received the Communication</small>
        <input
          placeholder="Person Who Received the Communication"
          {...register("received_by")}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <small>Name of Folder</small>
        <input
          placeholder="Name of Folder"
          {...register("name_of_folder")}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <small>Type (Internal or External)</small>
        <select
          className="border border-gray-300 rounded-md text-xs"
          {...register("type_resource")}
          required
        >
          <option value="" disabled>
            -
          </option>
          <option value="internal">Internal</option>
          <option value="external">External</option>
        </select>
      </div>

      {props.data ? null : (
        <div className="border border-gray-200 rounded-md p-3">
          <small className="mb-2">File to be uploaded:</small>
          <input
            type="file"
            className="!border-0"
            onChange={(event) => handleFileUpload(event.target.files![0])}
            ref={fileInputRef}
            required
          />
        </div>
      )}

      <Button type="submit">Submit</Button>
    </form>
  );
};
