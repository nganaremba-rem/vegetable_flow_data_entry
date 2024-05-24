"use client";

import { logout } from "@/lib/auth";
import { useTransition } from "react";
import FormButton from "./FormButton";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <FormButton
      onClick={() => {
        startTransition(() => {
          logout();
        });
      }}
      isPending={isPending}
      className="bg-red-500 hover:bg-red-700 w-full"
    >
      Logout
    </FormButton>
  );
}
