"use client";

import { salesManagerForecastAction } from "@/actions/salesManagerForecastAction";
import { DialogContainer } from "@/components/DialogContainer";
import { Button } from "@/components/ui/button";
import { useSrForcastedStore } from "@/store/srForcastedStore";
import { Separator } from "@radix-ui/react-separator";
import { MailCheck, MessageCircleWarning } from "lucide-react";
import { useState, useTransition } from "react";

export default function SubmitToProcurementButton({
  userId,
}: {
  userId: string;
}) {
  const { forcastedData } = useSrForcastedStore((state) => state);
  const [isPending, startTransition] = useTransition();
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [state, setState] = useState<{
    issues: string[];
    message: string;
  }>({
    issues: [],
    message: "",
  });

  if (!forcastedData || forcastedData?.[0]?.srPredictDataList === undefined) {
    return null;
  }

  const storeIds = forcastedData?.[0].srPredictDataList?.map(
    (item) => item.storeId
  );

  const dataToSubmit = storeIds.map((storeId) => {
    const itemForecastList = forcastedData.map((item) => {
      const smForeCast =
        item.srPredictDataList.find((item) => item.storeId === storeId)
          ?.smForeCast || 0;

      return {
        itemCode: item.itemCode,
        smForeCast,
      };
    });

    return {
      storeId,
      itemForecastList,
    };
  });

  console.log(dataToSubmit);

  async function submitData() {
    const { issues, message } = await salesManagerForecastAction(dataToSubmit);

    setState({
      issues,
      message,
    });

    if (issues.length) {
      setOpenErrorDialog(true);
      return;
    }

    setOpenSuccessDialog(true);
  }

  return (
    <>
      <DialogContainer open={openErrorDialog} setOpen={setOpenErrorDialog}>
        <div className="flex flex-col ">
          <div className="text-red-600 flex gap-6 items-center">
            <MessageCircleWarning size={30} color="red" />
            {state.issues?.[0] && state.issues[0]}
          </div>
          <Separator className="my-5" />
          <Button
            className="bg-red-600 hover:bg-red-700 text-white w-max self-end"
            onClick={() => setOpenErrorDialog(false)}
          >
            Close
          </Button>
        </div>
      </DialogContainer>
      <DialogContainer open={openSuccessDialog} setOpen={setOpenSuccessDialog}>
        <div className="flex flex-col ">
          <div className="text-green-600 flex gap-6 items-center">
            <MailCheck size={39} color="green" />
            {state?.message}
          </div>
          <Separator className="my-5" />
          <Button
            className="bg-red-600 text-white hover:bg-red-700 w-max self-end"
            onClick={() => setOpenSuccessDialog(false)}
          >
            Close
          </Button>
        </div>
      </DialogContainer>

      <Button
        onClick={() => {
          startTransition(() => {
            submitData();
          });
        }}
        disabled={isPending}
        className="bg-primary-blue hover:bg-sky-700 text-white"
      >
        {isPending ? "Submitting..." : "Submit to Procurement Team"}
      </Button>
    </>
  );
}
