"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

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
      className={cn("", className)}
      type="submit"
      {...rest}
      disabled={isPending}
    >
      <div className="inline-block">{children}</div>
      {isPending && <ClipLoader size={20} color="#ecedee" />}
    </Button>
  );
}
