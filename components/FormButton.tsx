"use client";

import { cn } from "@/lib/utils";
import { ClipLoader } from "react-spinners";
import { Button } from "./ui/button";

export default function FormButton({
  children,
  className,
  isPending,
  ...rest
}: {
  children: React.ReactNode;
  isPending: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  // const { pending: isPending } = useFormStatus();

  return (
    <Button
      className={cn("dark:text-slate-200", className)}
      type="submit"
      {...rest}
      disabled={isPending}
    >
      <div className="inline-block mx-5">{children}</div>
      {isPending && <ClipLoader size={20} color="#ecedee" />}
    </Button>
  );
}
