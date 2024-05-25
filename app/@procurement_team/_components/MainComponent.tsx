"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTable } from "@/components/data-table";
import type { FinalForecastedDataType } from "@/typings";
import { format } from "date-fns";
import { columns } from "../columns";

export default function MainComponent({
  finalForecastedData,
}: {
  finalForecastedData: FinalForecastedDataType[];
}) {
  return (
    <div className="px-10 flex flex-col gap-2 py-2">
      <p className="text-muted-foreground text-sm">
        Date: {format(Date.now(), "dd/MM/yyyy")}
      </p>
      <div className="self-end flex items-center gap-2">
        <CSVDownloadButton />
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
