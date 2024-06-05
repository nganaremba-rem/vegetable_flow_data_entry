import type { CSVDataFinalType } from "@/lib/generateCsvData";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa6";

export default function CSVDownloadButton({
  csvData,
  filename,
}: {
  csvData: CSVDataFinalType;
  filename: string;
}) {
  return (
    <CSVLink
      className="shadow-lg w-max text-sm flex items-center gap-2 text-gray-700 bg-slate-100 hover:bg-slate-200  px-5 py-2 rounded"
      data={csvData}
      filename={`${filename}.csv`}
    >
      Download as CSV
      <FaFileCsv color="green" size={20} />
    </CSVLink>
  );
}
