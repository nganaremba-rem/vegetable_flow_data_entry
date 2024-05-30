"use client";

import { updateVegetableAction } from "@/actions/editVegetableAction";
import FormButton from "@/components/FormButton";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { VegetableSchema } from "@/schema/VegetableSchema";
import type { VegetableType } from "@/typings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import type { z } from "zod";

export default function VegetableUpdateForm({
  vegetable,
}: {
  vegetable: VegetableType;
}) {
  const [state, setState] = useState<{ issues: string[]; message: string }>({
    issues: [],
    message: "",
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof VegetableSchema>>({
    resolver: zodResolver(VegetableSchema),
    defaultValues: {
      id: vegetable.id,
      itemName: vegetable.itemName,
      itemGroup: vegetable.itemGroup,
      packetWeight: vegetable.packetWeight,
      preset: vegetable.preset,
    },
  });

  const submitForm = async () => {
    setState({ issues: [""], message: "" });
    const { issues, message, status } = await updateVegetableAction(
      form.getValues()
    );

    if (status === "SUCCESS") {
      toast.success(message || "Vegetable updated successfully");
    } else {
      setState({ issues: [...issues], message });
    }
  };

  return (
    <>
      <div className="md:flex justify-center bg-primary-base dark:bg-primary-baseDark md:dark:bg-secondary-baseDark md:bg-white pt-10 md:pt-0">
        <div className=" rounded-xl md:shadow-xl md:ring-1 md:dark:ring-slate-700 md:ring-slate-200 p-5 sm:p-7 md:p-8 lg:p-10  md:bg-primary-base dark:bg-primary-baseDark">
          <div className="flex items-center gap-2  mb-2">
            <Button
              onClick={() => router.back()}
              className="hover:bg-slate-200 p-2 rounded bg-inherit text-gray-700"
            >
              <IoIosArrowBack size={30} />
            </Button>
            <h1 className="font-bold text-lg text-gray-600">
              Update Vegetable ID: {vegetable.id}
            </h1>
          </div>
          <Form {...form}>
            {state?.issues?.[0] && (
              <div className="text-red-500 py-2">{state?.issues?.[0]}</div>
            )}
            {state?.message && (
              <div className="text-green-600 bg-inherit py-2">
                {state.message}
              </div>
            )}
            <form
              onSubmit={form.handleSubmit(() => {
                startTransition(() => submitForm());
              })}
              className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 items-center"
            >
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-gray-800 dark:text-white">
                        Vegetable ID
                      </FormLabel>
                      <FormControl>
                        <Input readOnly {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="itemName"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-gray-800 dark:text-white">
                        Vegetable Name
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="itemGroup"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-gray-800 dark:text-white">
                        Vegetable Group
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="packetWeight"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-gray-800 dark:text-white">
                        Vegetable Weight
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="preset"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-gray-800 dark:text-white">
                        Target
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormButton
                isPending={isPending}
                className="w-full flex items-center sm:col-span-2 gap-2 bg-primary-blue hover:bg-[rgba(1,115,220,0.9)]"
              >
                Update
              </FormButton>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
