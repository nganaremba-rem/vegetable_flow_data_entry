"use client";

import type { CustomResponseType, FinalForecastedDataType } from "@/typings";

export default function ErrorMessage({
  data,
}: {
  data: CustomResponseType<FinalForecastedDataType>;
}) {
  return (
    <div className="text-lg font-bold text-center p-2 text-red-600">
      {data.message || "Error fetching data"}
    </div>
  );
}
