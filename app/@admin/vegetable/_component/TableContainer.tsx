"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTable } from "@/components/data-table";
import { generateCSVData } from "@/lib/generateCsvData";
import type { VegetableType } from "@/typings";
import { columns } from "../columns";

export default function TableContainer({ data }: { data: VegetableType[] }) {
  const csvData = generateCSVData(data);
  return (
    <div>
      <CSVDownloadButton csvData={csvData} filename="Vegetables" />
      <DataTable
        searchPlaceholder="Search Vegetable Name"
        searchId="itemName"
        columns={columns}
        data={data}
      />
    </div>
  );
}
