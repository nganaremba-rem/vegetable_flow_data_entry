"use client";

import { ComboBoxResponsive } from "@/components/ComboBox";
import { useSrForcastedStore } from "@/store/srForcastedStore";
import { useState } from "react";

export default function SelectVegList() {
  const { forecastedData } = useSrForcastedStore((state) => state);
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  if (
    !forecastedData ||
    !Array.isArray(forecastedData) ||
    forecastedData.length === 0
  ) {
    return <div>Unable to get forecasted Data</div>;
  }

  const storeList = forecastedData?.map((item) => ({
    label: item.storeName,
    value: item.storeId.replace(/\s/g, "-"),
  }));

  const scrollToComponent = (id: string) => {
    const element = document.getElementById(`component-${id}`);
    // console.log(element, id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ComboBoxResponsive
      cb={scrollToComponent}
      data={storeList}
      placeholder="Select Store"
    />
  );
}
