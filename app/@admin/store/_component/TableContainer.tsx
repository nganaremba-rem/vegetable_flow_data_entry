"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTable } from "@/components/data-table";
import { generateCSVData } from "@/lib/generateCsvData";
import { type StoreType, columns } from "../columns";

export default function TableContainer({ data }: { data: StoreType[] }) {
  const csvData = generateCSVData(data);
  return (
    <div>
      <CSVDownloadButton csvData={csvData} filename="Store" />
      <DataTable
        searchPlaceholder="Search Store Name"
        searchId="storeName"
        columns={columns}
        data={data}
      />
    </div>
  );
}
