"use client";

import { ComboBoxResponsive } from "@/components/ComboBox";
import { useSrForcastedStore } from "@/store/srForcastedStore";
import { useState } from "react";

export default function SelectVegList() {
  const { forcastedData } = useSrForcastedStore((state) => state);
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  if (
    !forcastedData ||
    !Array.isArray(forcastedData) ||
    forcastedData.length === 0
  ) {
    return null;
  }

  const vegList = forcastedData?.map((item) => ({
    label: item.itemName,
    value: item.itemName.replace(/\s/g, "-"),
  }));

  const scrollToComponent = (id: string) => {
    const element = document.getElementById(`component-${id}`);
    console.log(element, id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ComboBoxResponsive
      cb={scrollToComponent}
      data={vegList}
      placeholder="Select Veg"
    />
  );
}