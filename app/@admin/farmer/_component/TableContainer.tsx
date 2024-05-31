"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTable } from "@/components/data-table";
import { generateCSVData } from "@/lib/generateCsvData";
import type { FarmerType } from "@/typings";
import { columns } from "../columns";

export default function TableContainer({ data }: { data: FarmerType[] }) {
  const csvData = generateCSVData(data);
  return (
    <div>
      <CSVDownloadButton csvData={csvData} filename="Vegetables" />
      <DataTable
        searchPlaceholder="Search Farmer Name"
        searchId="fullName"
        columns={columns}
        data={data}
      />
    </div>
  );
}
