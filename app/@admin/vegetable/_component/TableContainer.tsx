"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTable } from "@/components/data-table";
import useCSVData from "@/hooks/useCSVData";
import type { VegetableType } from "@/typings";
import { format } from "date-fns";
import { useMemo } from "react";
import { columns } from "../columns";

export default function TableContainer({ data }: { data: VegetableType[] }) {
  const hiddenColumns = useMemo(() => ["id"], []);
  const csvData = useCSVData({ data, hiddenColumns });

  return (
    <div>
      <CSVDownloadButton
        csvData={csvData}
        filename={`Vegetables ${format(Date.now(), "dd-MM-yyyy hh:mm a")}`}
      />
      <DataTable
        searchPlaceholder="Search Vegetable Name"
        searchId="itemName"
        columns={columns}
        data={data}
      />
    </div>
  );
}
