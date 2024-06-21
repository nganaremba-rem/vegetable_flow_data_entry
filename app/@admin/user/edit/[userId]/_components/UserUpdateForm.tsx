"use client";

import { userUpdateAction } from "@/actions/editUserAction";
import FormButton from "@/components/FormButton";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserSchema } from "@/schema/UserSchema";
import type { UserType } from "@/typings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import type { z } from "zod";

export default function UserUpdateForm({
  user,
  roleOptions,
  storeOptions,
}: {
  user: UserType;
  roleOptions: { label: string; value: string }[];
  storeOptions: { label: string; value: string }[];
}) {
  const [state, setState] = useState<{ issues: string[]; message: string }>({
    issues: [],
    message: "",
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      userName: user.userName,
      email: user.email,
      address: user.address,
      empId: user.empId,
      info: user.info,
      gender: user.gender || "",
      roleCode: user.roleCode || "",
      // storeId: user.storeId || "",
    },
  });

  const submitForm = async () => {
    setState({ issues: [""], message: "" });
    const { issues, message, status } = await userUpdateAction(
      form.getValues()
    );

    if (status !== "SUCCESS") {
      setState({ issues: [...issues], message });
    } else {
      form.reset();
      toast.success(message || "User updated successfully");
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
              Update User ID: {user.empId}
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
                name="empId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-gray-800 dark:text-white">
                        Employee ID
                      </FormLabel>
                      <FormControl>
                        <Input disabled {...field} />
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
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
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
              {/* <FormField
                control={form.control}
                name="storeId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Store</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={"Select Store"} />
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
              /> */}
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
                Update
              </FormButton>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
