"use client";

import { updateAvailableItems } from "@/actions/updateAvailableItems";
import FormButton from "@/components/FormButton";
import { type OptionType, ReactSelect } from "@/components/ReactSelect";
import { Button } from "@/components/ui/button";
import type { FarmerType } from "@/typings";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { IoIosArrowBack } from "react-icons/io";
import type { MultiValue } from "react-select";
import { toast } from "react-toastify";

export default function UpdateAvailableItemsForm({
  options,
  defaultValues,
  farmer,
}: {
  options: MultiValue<OptionType>;
  defaultValues: MultiValue<OptionType>;
  farmer: FarmerType;
}) {
  const [isPending, startTransition] = useTransition();
  const [selectedValues, setSelectedValues] =
    useState<MultiValue<OptionType>>(defaultValues);
  const [state, setState] = useState<{ issues: string[]; message: string }>({
    issues: [],
    message: "",
  });
  const router = useRouter();

  async function submitUpdateAvailableItemsForm() {
    setState({ issues: [""], message: "" });

    const selectedItems = selectedValues.map((item) => item.value).join(",");
    const { issues, message, status } = await updateAvailableItems({
      availableItem: selectedItems,
      farmerId: farmer.farmerId,
    });
    if (status === "SUCCESS") {
      toast.success(message || "Available Vegetables successfully");
    } else {
      setState({ issues: [...issues], message });
    }
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(() => {
            submitUpdateAvailableItemsForm();
          });
        }}
        className="grid gap-5"
      >
        <div className="flex items-center gap-2  mb-2">
          <Button
            type="button"
            onClick={() => router.back()}
            className="hover:bg-slate-200 p-2 rounded bg-inherit text-gray-700"
          >
            <IoIosArrowBack size={30} />
          </Button>
          <h1 className="font-bold text-lg text-gray-600">{farmer.fullName}</h1>
        </div>

        {state?.issues?.[0] && (
          <div className="text-red-500 py-2">{state?.issues?.[0]}</div>
        )}
        {state?.message && (
          <div className="text-green-600 bg-inherit py-2">{state.message}</div>
        )}

        <ReactSelect
          name="availableItems"
          options={options}
          defaultValues={defaultValues}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
        <FormButton className="bg-sky-600" isPending={isPending}>
          Submit
        </FormButton>
      </form>
    </>
  );
}
