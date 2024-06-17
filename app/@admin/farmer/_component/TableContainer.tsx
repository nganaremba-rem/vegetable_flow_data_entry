"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTable } from "@/components/data-table";
import useCSVData from "@/hooks/useCSVData";
import type { FarmerType } from "@/typings";
import { format } from "date-fns";
import { useMemo } from "react";
import { columns } from "../columns";

export default function TableContainer({ data }: { data: FarmerType[] }) {
  const hiddenColumns = useMemo(() => ["id"], []);

  const csvData = useCSVData({ data, hiddenColumns });

  return (
    <div>
      <CSVDownloadButton
        csvData={csvData}
        filename={`Farmers - ${format(Date.now(), "dd-MM-yyyy hh:mm a")}`}
      />
      <DataTable
        searchPlaceholder="Search Farmer Name"
        searchId="fullName"
        columns={columns}
        data={data}
      />
    </div>
  );
}
