import type { CSVDataFinalType } from "@/lib/generateCsvData";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa6";
import { Button } from "./ui/button";

export default function CSVDownloadButton({
  csvData,
  filename,
}: {
  csvData: CSVDataFinalType;
  filename: string;
}) {
  return (
    <CSVLink data={csvData} filename={`${filename}.csv`}>
      <Button className="bg-inherit shadow hover:bg-slate-200">
        <FaFileCsv color="green" size={35} />
      </Button>
    </CSVLink>
  );
}
