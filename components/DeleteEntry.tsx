"use client";

import type { CustomMutateResponseType } from "@/typings";
import type React from "react";
import { useTransition } from "react";
import { ClipLoader } from "react-spinners";
import { toast as toastify } from "react-toastify";
import { Button } from "./ui/button";

export default function DeleteEntry({
  setOpenDropdown,
  setState,
  serverActionFn,
}: {
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setState: React.Dispatch<
    React.SetStateAction<{ issues: string[]; message: string }>
  >;
  serverActionFn: () => Promise<
    | {
        status: string;
        issues: any;
        message: string;
        data: never[];
      }
    | CustomMutateResponseType<[]>
  >;
}) {
  const [isPending, startTransition] = useTransition();

  const deleteFn = async () => {
    const { issues, message } = await serverActionFn();
    setState({ issues: [...issues], message });

    if (issues.length === 0) {
      setOpenDropdown(false);
      toastify.success(message || "Deleted successfully");
    }
  };

  return (
    <Button
      onClick={() => {
        startTransition(() => {
          deleteFn();
        });
      }}
      disabled={isPending}
      variant="destructive"
    >
      {isPending ? (
        <>
          <span className="px-2">Deleting...</span>{" "}
          <ClipLoader color="#ccc" size={20} />
        </>
      ) : (
        "Delete"
      )}
    </Button>
  );
}
