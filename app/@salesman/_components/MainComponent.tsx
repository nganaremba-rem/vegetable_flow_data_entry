"use client";

import { salesRepForecast } from "@/actions/salesRepForecast";
import type { StoreType } from "@/app/@admin/store/columns";
import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DialogContainer } from "@/components/DialogContainer";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useCSVData from "@/hooks/useCSVData";
import { useItemStore } from "@/store/itemStore";
import type {
  CustomResponseType,
  ItemsWithPreset,
  SalesRepForecastType,
} from "@/typings";
import { format } from "date-fns";
import { MailCheck, MessageCircleWarning } from "lucide-react";
import { useEffect, useMemo, useState, useTransition } from "react";
import { alreadForecastedColumns } from "../alreadySubmittedColumns";
import { columns } from "../columns";

export default function MainComponent({
  items,
  storeId,
  byRole,
  isAlreadyForecasted,
  storeDetail,
  alreadyForecastedData,
}: {
  items: ItemsWithPreset[];
  storeId: string;
  byRole: string;
  isAlreadyForecasted: boolean;
  storeDetail: StoreType;
  alreadyForecastedData: CustomResponseType<{
    storeId: string;
    storeName: string;
    data: SalesRepForecastType[];
  }> | null;
}) {
  const { setItems, items: finalItems } = useItemStore((state) => state);
  const [isPending, startTransition] = useTransition();
  const [state, setState] = useState<{
    issues: string[];
    message: string;
  }>({
    issues: [],
    message: "",
  });
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  useEffect(() => {
    for (const item of items) {
      item.packets_required =
        item?.packets_required !== 0 && !item?.packets_required
          ? item.preset - (item.inventory || 0)
          : item.packets_required;
    }

    setItems(items);
  }, [items, setItems]);

  async function submitForecast(finalItems: ItemsWithPreset[]) {
    const dataToSubmit = finalItems.map((item) => {
      let srForecast = 0;

      if (item?.packets_required !== 0 && !item?.packets_required) {
        srForecast =
          item.preset - (item.inventory || 0) < 0
            ? 0
            : item.preset - (item.inventory || 0);
      } else if (item.packets_required < 0) {
        srForecast = 0;
      } else {
        srForecast = item.packets_required;
      }

      return {
        itemCode: item.itemCode,
        inventory: item?.inventory || 0,
        srForecast,
      };
    });

    const finalData = {
      storeId,
      byRole,
      data: dataToSubmit,
    };

    console.log(finalData);

    const { issues, message } = await salesRepForecast(finalData);
    setState({ issues, message });

    if (issues.length > 0) {
      setIsErrorDialogOpen(true);
      setIsSuccessDialogOpen(false);
    } else {
      setIsSuccessDialogOpen(true);
      setIsErrorDialogOpen(false);
    }
  }

  const hiddenColumns = useMemo(() => ["itemCode"], []);

  const csvData = useCSVData({
    data:
      alreadyForecastedData !== null
        ? alreadyForecastedData?.data?.data
        : items,
    hiddenColumns,
  });

  return (
    <div className="2xl:px-[17rem] px-3 md:px-10 flex flex-col gap-2 py-2">
      <DialogContainer open={isErrorDialogOpen} setOpen={setIsErrorDialogOpen}>
        <div className="flex flex-col ">
          <div className="text-red-600 flex gap-6 items-center">
            <MessageCircleWarning size={30} color="red" />
            {state.issues?.[0] && state.issues[0]}
          </div>
          <Separator className="my-5" />
          <Button
            className="bg-red-600 text-white hover:bg-red-700 w-max self-end"
            onClick={() => setIsErrorDialogOpen(false)}
          >
            Close
          </Button>
        </div>
      </DialogContainer>
      <DialogContainer
        open={isSuccessDialogOpen}
        setOpen={setIsSuccessDialogOpen}
      >
        <div className="flex flex-col ">
          <div className="text-green-600 flex gap-6 items-center">
            <MailCheck size={39} color="green" />
            {state?.message}
          </div>
          <Separator className="my-5" />
          <Button
            className="bg-red-600 text-white hover:bg-red-700 w-max self-end"
            onClick={() => setIsSuccessDialogOpen(false)}
          >
            Close
          </Button>
        </div>
      </DialogContainer>
      <div className="flex justify-between items-center gap-2">
        <p className="text-gray-700 text-sm">
          Date: {format(Date.now(), "dd/MM/yyyy")}
        </p>
        <CSVDownloadButton
          filename={`Sales Rep Record - ${storeDetail.storeName} (${format(
            Date.now(),
            "dd-MM-yyyy hh:mma"
          )})`}
          csvData={csvData}
        />
      </div>
      <div className="text-green-500 text-sm">
        {isAlreadyForecasted && alreadyForecastedData?.message}
      </div>
      <DataTable
        searchId="itemName"
        searchPlaceholder="Search Items"
        columns={isAlreadyForecasted ? alreadForecastedColumns : columns}
        data={
          alreadyForecastedData !== null
            ? alreadyForecastedData?.data?.data
            : items
        }
      />
      <Button
        onClick={() => {
          startTransition(() => {
            submitForecast(finalItems);
          });
        }}
        disabled={isPending || isAlreadyForecasted || finalItems.length === 0}
        className="w-full my-10 shadow-lg bg-primary-blue hover:bg-sky-700 dark:text-white"
      >
        {isPending ? "Submitting..." : "Submit to Sales Manager"}
      </Button>
    </div>
  );
}
