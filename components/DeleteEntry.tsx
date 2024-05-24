"use client";

import type React from "react";
import { useTransition } from "react";
import { Button } from "./ui/button";
import deleteStoreAction from "@/actions/deleteStoreAction";
import { ClipLoader } from "react-spinners";

export default function DeleteEntry({
  id,
  setOpenDropdown,
  setState,
}: {
  id: string;
  setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  setState: React.Dispatch<
    React.SetStateAction<{ issues: string[]; message: string }>
  >;
}) {
  const [isPending, startTransition] = useTransition();

  const deleteStore = async () => {
    const { issues, message } = await deleteStoreAction(id);
    setState({ issues: [...issues], message });

    if (issues.length === 0) {
      setOpenDropdown(false);
    }
  };

  return (
    <Button
      onClick={() => {
        startTransition(() => {
          deleteStore();
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
