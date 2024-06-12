import { Button } from "@/components/ui/button";
import type { DataAvailabilityType } from "@/typings";
import type { Row } from "@tanstack/react-table";
import Link from "next/link";

export default function SubmitBySMForSR({
  row,
}: {
  row: Row<DataAvailabilityType>;
}) {
  return (
    <div>
      <Link href={`/proxy-entry/${row.original.storeId}`}>
        <Button className="bg-sky-500 text-white hover:bg-sky-700" size={"sm"}>
          Proxy Entry
        </Button>
      </Link>
    </div>
  );
}
