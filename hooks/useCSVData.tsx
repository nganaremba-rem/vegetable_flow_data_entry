import {
  type CSVDataFinalType,
  type CSVDataFormatRequired,
  generateCSVData,
} from "@/lib/generateCsvData";
import { useEffect, useState } from "react";

export default function useCSVData({
  data,
  hiddenColumns,
  listOfKeysWithFormatterCallback,
}: {
  data: CSVDataFormatRequired[] | null | undefined;
  hiddenColumns?: string[];
  listOfKeysWithFormatterCallback?:
    | {
        key: string;
        cb: (value: string) => string;
      }[]
    | null;
}) {
  const [csvDataState, setCsvDataState] = useState<CSVDataFinalType>([]);

  useEffect(() => {
    if (data === null || data?.length === 0) return;

    const csvData = generateCSVData(
      data,
      hiddenColumns,
      listOfKeysWithFormatterCallback
    );

    setCsvDataState(csvData);
  }, [data, hiddenColumns, listOfKeysWithFormatterCallback]);

  return csvDataState;
}
