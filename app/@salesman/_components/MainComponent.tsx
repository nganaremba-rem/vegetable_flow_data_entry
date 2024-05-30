"use client";

import { salesRepForecast } from "@/actions/salesRepForecast";
import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DialogContainer } from "@/components/DialogContainer";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { generateCSVData } from "@/lib/generateCsvData";
import { useItemStore } from "@/store/itemStore";
import type { itemType } from "@/typings";
import { MailCheck, MessageCircleWarning } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { columns } from "../columns";

export default function MainComponent({
  items,
  storeId,
  byRole,
}: {
  items: itemType[];
  storeId: string;
  byRole: string;
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

  async function submitForecast(finalItems: itemType[]) {
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
        itemCode: item.id,
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

  const csvData = generateCSVData(items);

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
      <div className="self-end flex items-center gap-2">
        <CSVDownloadButton filename="Sales Rep Record" csvData={csvData} />
        <Button
          onClick={() => {
            startTransition(() => {
              submitForecast(finalItems);
            });
          }}
          disabled={isPending}
          className="w-max bg-primary-blue hover:bg-sky-700 dark:text-white"
        >
          {isPending ? "Submitting..." : "Submit to Sales Manager"}
        </Button>
      </div>
      <DataTable
        searchId="itemName"
        searchPlaceholder="Search Items"
        columns={columns}
        data={items}
      />
    </div>
  );
}
