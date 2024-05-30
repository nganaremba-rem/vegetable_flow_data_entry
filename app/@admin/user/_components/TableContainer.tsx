"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTable } from "@/components/data-table";
import { generateCSVData } from "@/lib/generateCsvData";
import type { UserType } from "@/typings";
import { columns } from "../columns";

export default function TableContainer({ data }: { data: UserType[] }) {
  const csvData = generateCSVData(data);
  return (
    <div>
      <CSVDownloadButton csvData={csvData} filename="Store" />
      <DataTable
        searchId="userName"
        searchPlaceholder="Search Username"
        columns={columns}
        data={data}
      />
    </div>
  );
}
