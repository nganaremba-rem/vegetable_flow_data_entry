"use client";

import FormButton from "@/components/FormButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoIosArrowBack } from "react-icons/io";

import { addUserAction } from "@/actions/addUserAction";
import FormSelectOption from "@/components/FormSelectOption";
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
import { UserSchema } from "@/schema/UserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import type { z } from "zod";

export type AddFormState = {
  issues: string[];
  message: string;
};

type FormSchema = z.infer<typeof UserSchema>;

export default function AddUser({
  roleOptions,
  storeOptions,
}: {
  roleOptions: { label: string; value: string }[];
  storeOptions: { label: string; value: string }[];
}) {
  const router = useRouter();
  const [state, setState] = useState<AddFormState>({
    issues: [],
    message: "",
  });
  const [isPending, startTransition] = useTransition();
  const [genderKey, setGenderKey] = useState(v4());
  const [roleCodeKey, setRoleCodeKey] = useState(v4());
  const [storeKey, setStoreKey] = useState(v4());

  const form = useForm<FormSchema>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      address: "",
      email: "",
      empId: "",
      info: "",
      password: "",
      roleCode: "",
      storeId: "",
      userName: "",
    },
  });

  const submitForm = async () => {
    setState({ issues: [""], message: "" });
    const { message, status, issues } = await addUserAction(form.getValues());

    if (status === "SUCCESS") {
      form.reset();
      toast.success(message || "User added successfully");
      setGenderKey(v4());
      setRoleCodeKey(v4());
      setStoreKey(v4());
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
            Add New User
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
              name="empId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-gray-800 dark:text-white">
                      Employee ID
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
              name="userName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-gray-800 dark:text-white">
                      Username
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
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-gray-800 dark:text-white">
                      Email
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
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    key={genderKey}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="M">Male</SelectItem>
                      <SelectItem value="F">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-gray-800 dark:text-white">
                      Password
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
              name="roleCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Code</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    key={roleCodeKey}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Role Code" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <FormSelectOption options={roleOptions} />
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="storeId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Store ID</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      key={storeKey}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={"Select Store ID"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <FormSelectOption options={storeOptions} />
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="info"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-gray-800 dark:text-white">
                      Info
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
