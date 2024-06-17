"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTable } from "@/components/data-table";
import useCSVData from "@/hooks/useCSVData";
import type { FinalForecastedDataType } from "@/typings";
import { format } from "date-fns";
import { useMemo } from "react";
import { columns } from "../columns";

export default function MainComponent({
  finalForecastedData,
}: {
  finalForecastedData: FinalForecastedDataType[];
}) {
  const hiddenColumns = useMemo(() => ["itemCode"], []);

  const csvData = useCSVData({ data: finalForecastedData, hiddenColumns });

  return (
    <div className="md:px-10 px-3  flex flex-col gap-2 py-2">
      <p className="text-muted-foreground text-sm">
        Date: {format(Date.now(), "dd/MM/yyyy")}
      </p>
      <div className="self-end flex items-center gap-2">
        <CSVDownloadButton
          csvData={csvData}
          filename={`Procurement team received data - ${format(
            Date.now(),
            "dd-MM-yyyy hh:ss a"
          )}`}
        />
      </div>
      <DataTable
        searchId="itemName"
        searchPlaceholder="Search Vegetables"
        columns={columns}
        data={finalForecastedData}
      />
    </div>
  );
}
