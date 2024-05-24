import React from "react";
import { FaFileCsv } from "react-icons/fa6";
import { Button } from "./ui/button";

export default function CSVDownloadButton() {
  return (
    <Button className="bg-inherit hover:bg-slate-200">
      <FaFileCsv color="green" size={35} />
    </Button>
  );
}
