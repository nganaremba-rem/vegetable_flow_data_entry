"use client";

import { salesRepForecast } from "@/actions/salesRepForecast";
import CSVDownloadButton from "@/components/CSVDownloadButton";
import { DialogContainer } from "@/components/DialogContainer";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useItemStore } from "@/store/itemStore";
import type { itemType, userSessionType } from "@/typings";
import { MailCheck, MessageCircleWarning } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { columns } from "../columns";

export default function MainComponent({
  items,
  userInfo,
}: {
  items: itemType[];
  userInfo: userSessionType;
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
    setItems(items);
  }, [items, setItems]);

  async function submitForecast(finalItems: itemType[]) {
    const dataToSubmit = finalItems.map((item) => ({
      itemCode: item.id,
      inventory: item?.inventory || 0,
      srForecast: item?.packets_required || 0,
    }));

    const { issues, message } = await salesRepForecast(
      dataToSubmit,
      userInfo.userInfo.userId
    );
    setState({ issues, message });

    if (issues.length > 0) {
      setIsErrorDialogOpen(true);
      setIsSuccessDialogOpen(false);
    } else {
      setIsSuccessDialogOpen(true);
      setIsErrorDialogOpen(false);
    }
  }

  return (
    <div className="px-10 flex flex-col gap-2 py-2">
      <DialogContainer open={isErrorDialogOpen} setOpen={setIsErrorDialogOpen}>
        <div className="flex flex-col ">
          <div className="text-red-600 flex gap-6 items-center">
            <MessageCircleWarning size={30} color="red" />
            {state.issues?.[0] && state.issues[0]}
          </div>
          <Separator className="my-5" />
          <Button
            className="bg-red-600 hover:bg-red-700 w-max self-end"
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
            className="bg-red-600 hover:bg-red-700 w-max self-end"
            onClick={() => setIsSuccessDialogOpen(false)}
          >
            Close
          </Button>
        </div>
      </DialogContainer>
      <div className="self-end flex items-center gap-2">
        <CSVDownloadButton />
        <Button
          onClick={() => {
            startTransition(() => {
              submitForecast(finalItems);
            });
          }}
          disabled={isPending}
          className="w-max bg-primary-blue hover:bg-sky-700"
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
