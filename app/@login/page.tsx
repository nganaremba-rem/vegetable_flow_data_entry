"use client";

import { loginAction } from "@/actions/loginAction";
import FormButton from "@/components/FormButton";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { formSchema } from "../../schema/LoginFormSchema";

type FormSchema = z.infer<typeof formSchema>;

const userCredentials = {
  admin: {
    email: "admin@ksw.com",
    password: "123",
  },
  salesRep: {
    email: "sr_s2@ksw.com",
    password: "123",
  },
  manager: {
    email: "sm@ksw.com",
    password: "123",
  },
  pt: {
    email: "pt@ksw.com",
    password: "123",
  },
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState<{ issues: string[]; message: string }>({
    issues: [],
    message: "",
  });
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  // 1. Define your form.
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // Submit function
  const submitFuncion = async () => {
    // formRef?.current?.submit();
    const formData = new FormData();
    formData.append("email", form.getValues("email"));
    formData.append("password", form.getValues("password"));
    const { issues, message } = await loginAction(formData);
    if (issues.length === 0) {
      form.reset();
    }
    setState({ issues: [...issues], message });
  };

  return (
    <div className="md:flex justify-center bg-white  md:dark:bg-secondary-baseDark  pt-10 md:pt-0 items-center min-h-[100svh] md:bg-primary-base dark:bg-primary-baseDark">
      <div className=" rounded-xl md:shadow-xl md:min-w-[25rem] md:max-w-[25rem]  md:ring-1 md:dark:ring-slate-700 md:ring-slate-200 p-5 sm:p-7 md:p-8 lg:py-6 lg:px-12 md:bg-white dark:bg-primary-baseDark">
        <div className="flex justify-center">
          <Logo size={100} />
        </div>
        <Form {...form}>
          {state?.issues?.[0] && (
            <p className="text-red-600 ">{state?.issues?.[0]}</p>
          )}
          {state?.message && (
            <p className="text-green-600 ">{state?.message}</p>
          )}
          <form
            method="post"
            ref={formRef}
            // action={formAction}
            onSubmit={form.handleSubmit(() => {
              startTransition(() => submitFuncion());
            })}
            className="space-y-2 my-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 dark:text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-800 dark:text-white">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2 pb-5">
              <Checkbox
                id="showPassword"
                onCheckedChange={(checked) => {
                  checked && setShowPassword(true);
                  !checked && setShowPassword(false);
                }}
              />
              <FormLabel
                className="text-gray-800 dark:text-white"
                htmlFor="showPassword"
              >
                Show password
              </FormLabel>
            </div>
            <FormButton
              isPending={isPending}
              className="w-full flex items-center gap-2 bg-primary-blue hover:bg-[rgba(1,115,220,0.9)]"
            >
              Login
            </FormButton>
          </form>

          <div className="flex gap-2">
            <Button
              size={"sm"}
              onClick={() => {
                form.setValue("email", userCredentials.admin.email);
                form.setValue("password", userCredentials.admin.password);
              }}
            >
              Admin
            </Button>
            <Button
              size={"sm"}
              onClick={() => {
                form.setValue("email", userCredentials.salesRep.email);
                form.setValue("password", userCredentials.salesRep.password);
              }}
            >
              SR
            </Button>
            <Button
              size={"sm"}
              onClick={() => {
                form.setValue("email", userCredentials.manager.email);
                form.setValue("password", userCredentials.manager.password);
              }}
            >
              SM
            </Button>
            <Button
              size={"sm"}
              onClick={() => {
                form.setValue("email", userCredentials.pt.email);
                form.setValue("password", userCredentials.pt.password);
              }}
            >
              PT
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
