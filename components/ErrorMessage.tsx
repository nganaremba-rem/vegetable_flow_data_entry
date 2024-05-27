"use client";

import type { FinalForecastedDataResponseType } from "@/typings";

export default function ErrorMessage({
  data,
}: {
  data: FinalForecastedDataResponseType;
}) {
  return (
    <div className="text-lg font-bold text-center p-2 text-red-600">
      {data.message || "Error fetching data"}
    </div>
  );
}
