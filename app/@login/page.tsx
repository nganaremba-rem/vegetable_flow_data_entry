"use client";

import { loginAction } from "@/actions/loginAction";
import FormButton from "@/components/FormButton";
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
    <div className="md:flex justify-center bg-primary-base dark:bg-primary-baseDark md:dark:bg-secondary-baseDark md:bg-white pt-10 md:pt-0 items-center min-h-[100svh]">
      <div className=" rounded-xl md:shadow-xl md:ring-1 md:dark:ring-slate-700 md:ring-slate-200 p-5 sm:p-7 md:p-8 lg:p-10  md:bg-primary-base dark:bg-primary-baseDark">
        <h1 className="py-5 text-2xl font-extrabold text-gray-600 dark:text-slate-200">
          KSW - Vegetable Flow Data Entry
        </h1>
        <Form {...form}>
          {state?.issues?.[0] && (
            <div className="text-red-600">{state?.issues?.[0]}</div>
          )}
          {state?.message && (
            <div className="text-green-600">{state?.message}</div>
          )}
          <form
            method="post"
            ref={formRef}
            // action={formAction}
            onSubmit={form.handleSubmit(() => {
              startTransition(() => submitFuncion());
            })}
            className="space-y-2"
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
        </Form>
      </div>
    </div>
  );
}
