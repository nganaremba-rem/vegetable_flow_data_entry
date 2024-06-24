"use client";

import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useCSVData from "@/hooks/useCSVData";
import { useColumns } from "@/hooks/useColumns";
import { generateCSVData } from "@/lib/generateCsvData";
import { useSrForcastedStore } from "@/store/srForcastedStore";
import type {
  CustomResponseType,
  SalesManagerTableDataType,
  SalesRepForecastedLatestDataType,
} from "@/typings";
import { format } from "date-fns";
import { useEffect } from "react";
import FinalForeCastInput from "./FinalForecastInput";
import SubmitToProcurementButton from "./SubmitToProcurementButton";
import { DataTable } from "./data-table";

export default function MainComponent({
  isAlreadySubmitted,
  salesManagerTableData,
  rawSalesRepReport,
  smReportStatus,
  isAllDataAvailable,
}: {
  salesManagerTableData: SalesManagerTableDataType[];
  isAlreadySubmitted: boolean;
  rawSalesRepReport: SalesRepForecastedLatestDataType[];
  smReportStatus: CustomResponseType<unknown>;
  isAllDataAvailable: boolean;
}) {
  const { setItems, forecastedData, updateItem } = useSrForcastedStore(
    (state) => state
  );

  const allCsvData = useCSVData({ data: salesManagerTableData });

  // set the forecasted data along with storeId and default smForecast
  useEffect(() => {
    if (!rawSalesRepReport) return;
    const dataToSet = rawSalesRepReport.map((store) => {
      const data = store.data.map((currentData) => {
        return {
          ...currentData,
          smForeCast: currentData.srForecast || 0,
          storeId: store.storeId,
        };
      });

      return {
        ...store,
        data,
      };
    });

    setItems(dataToSet);
  }, [rawSalesRepReport, setItems]);

  // Create table column with extra column for Sales Manager Forecast and hide some columns
  const columns = useColumns(
    forecastedData?.[0]?.data,
    [
      {
        accessorKey: "smForeCast",
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title="Sales Manager Forecast"
          />
        ),
        cell: ({ row }) => {
          if (isAlreadySubmitted) return row.original.smForeCast;
          return <FinalForeCastInput row={row} />;
        },
      },
    ],
    ["itemCode", "storeId"]
  );

  const salesManagerTableDataCols = useColumns(salesManagerTableData, [
    {
      accessorKey: "Packet Weight",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Packet Weight (g)" />
      ),
      cell: ({ row }) => {
        return `${row.original["Packet Weight"]} g`;
      },
    },
  ]);

  if (forecastedData?.length === 0) {
    return (
      <div className="text-gray-800 text-center dark:text-slate-200 text-xl font-bold ">
        No Data Available
      </div>
    );
  }

  return (
    <>
      <div className="relative px-2 2xl:px-[10rem]">
        <div className="text-gray-800 dark:text-slate-200 text-xl font-bold ">
          Sales Rep Forecasted Data{" "}
        </div>
        <div className="text-sm text-green-500 my-2">
          {smReportStatus.status === "AVAILABLE" && smReportStatus.message}
        </div>
        {/* <div className="flex items-center gap-2 my-4">
          <CSVDownloadButton
            text="Download All Combined Forecast Report"
            csvData={allCsvData}
            filename={`Combined Forecast Report - ${format(
              Date.now(),
              "dd-MM-yyyy | hh:mm a"
            )}`}
          />
        </div> */}

        <Tabs defaultValue={forecastedData?.[0]?.storeId}>
          <ScrollArea className="w-full">
            <TabsList>
              <TabsTrigger
                title={"All"}
                key={"allCombinedForecastReport"}
                value={"allCombinedForecastReport"}
              >
                All
              </TabsTrigger>
              {forecastedData.map((store) => (
                <TabsTrigger
                  title={store.storeName}
                  key={store.storeId}
                  value={store.storeId}
                >
                  {store.storeName}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <TabsContent
            key={"allCombinedForecastReport"}
            value={"allCombinedForecastReport"}
          >
            <div className="flex justify-end">
              <CSVDownloadButton
                text="Download Combined Forecast Report"
                csvData={allCsvData}
                filename={`Combined Forecast Report - ${format(
                  Date.now(),
                  "dd-MM-yyyy | hh:mm a"
                )}`}
              />
            </div>
            <DataTable
              data={salesManagerTableData}
              searchId={"itemName"}
              searchPlaceholder="Search Vegetable"
              columns={salesManagerTableDataCols}
            />
          </TabsContent>
          {forecastedData.map((store) => (
            <TabsContent key={store.storeId} value={store.storeId}>
              <div className="flex justify-end">
                {isAlreadySubmitted && (
                  <CSVDownloadButton
                    filename={`${store.storeName} SM Forecasted - ${format(
                      Date.now(),
                      "dd-MM-yyyy hh:mm a"
                    )}`}
                    csvData={generateCSVData(store.data, [
                      "itemCode",
                      "storeId",
                    ])}
                  />
                )}
              </div>
              <DataTable
                data={store.data}
                searchId={"itemName"}
                searchPlaceholder="Search Vegetable"
                columns={columns}
              />
            </TabsContent>
          ))}
        </Tabs>
        <div className="my-10">
          {!isAllDataAvailable && (
            <div className="p-2 text-red-600">
              Unable to proceed until all stores have submitted the forecast.
            </div>
          )}
          {isAlreadySubmitted && (
            <div className="text-green-600 text-center">Already Submitted</div>
          )}
          <SubmitToProcurementButton
            isAlreadySubmitted={isAlreadySubmitted || !isAllDataAvailable}
          />
        </div>
      </div>
    </>
  );
}
