"use client";

import FormButton from "@/components/FormButton";
import { IoIosArrowBack } from "react-icons/io";

import { addFarmerAction } from "@/actions/addFarmerAction";
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
import { FarmerSchema } from "@/schema/FarmerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import type { z } from "zod";

export type AddFormState = {
  issues: string[];
  message: string;
};

type FormSchema = z.infer<typeof FarmerSchema>;

export default function AddFarmer() {
  const router = useRouter();
  const [state, setState] = useState<AddFormState>({
    issues: [],
    message: "",
  });
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormSchema>({
    resolver: zodResolver(FarmerSchema),
    defaultValues: {
      farmerId: "",
      fullName: "",
      address: "",
      phoneNo: "",
      availableItem: "",
    },
  });

  const submitForm = async () => {
    setState({ issues: [""], message: "" });
    const { message, status, issues } = await addFarmerAction(form.getValues());

    if (status === "SUCCESS") {
      form.reset();
      toast.success(message || "Farmer added successfully");
    } else {
      setState({ issues: [...issues], message });
    }
  };

  return (
    <div className="md:flex justify-center bg-primary-base dark:bg-primary-baseDark md:dark:bg-secondary-baseDark md:bg-white pt-10 md:pt-0">
      <div className=" rounded-xl md:shadow-xl md:ring-1 md:dark:ring-slate-700 md:ring-slate-200 p-5 sm:p-7 md:p-8 lg:p-10  md:bg-primary-base dark:bg-primary-baseDark">
        <div className="flex items-center gap-2  mb-2">
          <Button
            onClick={() => router.back()}
            className="hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-gray-700 p-2 rounded bg-inherit text-gray-700"
          >
            <IoIosArrowBack size={30} />
          </Button>
          <h1 className="font-bold text-lg text-gray-600 dark:text-slate-300">
            Add New Farmer
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
            method="POST"
            className="space-y-2 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4 items-center"
          >
            <FormField
              control={form.control}
              name="farmerId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-gray-800 dark:text-white">
                      Farmer ID
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
              name="fullName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-gray-800 dark:text-white">
                      Full Name
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
              name="address"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-gray-800 dark:text-white">
                      Address
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
              name="phoneNo"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-gray-800 dark:text-white">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input type="tel" maxLength={10} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="availableItem"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-gray-800 dark:text-white">
                      Available Items
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
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
              Add
            </FormButton>
          </form>
        </Form>
      </div>
    </div>
  );
}
