"use server";

import LogoutButton from "@/components/LogoutButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession } from "@/lib/auth";
import type { userSessionType } from "@/typings";
import { UserIcon } from "lucide-react";

export default async function ProfileButton() {
  const session = await getSession<userSessionType>();
  if (!session) return;
  const userInfo = session.userInfo;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none select-none flex items-center gap-2">
        <div className="hidden sm:flex text-muted-foreground overflow-hidden w-[7rem] bg-slate-200 dark:bg-gray-700 dark:text-slate-200 p-2 rounded-full">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            {userInfo.userName}
          </div>
        </div>
        <Avatar className="shadow-lg">
          {/* <AvatarImage src="https://github.com/shadcasdfn.png" /> */}
          <AvatarFallback className="bg-sky-500">
            <UserIcon color="white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full backdrop-blur-2xl backdrop-brightness-95 bg-transparent shadow-xl">
        <div className="w-56 overflow-hidden group">
          <DropdownMenuLabel className="whitespace-nowrap w-max text-ellipsis overflow-hidden group-hover:overflow-visible transition-all duration-300 ease-in-out ">
            {/* <DropdownMenuLabel className="whitespace-nowrap w-max text-ellipsis overflow-hidden group-hover:overflow-visible transition-all duration-300 ease-in-out group-hover:animate-scroll"> */}
            {userInfo.userName}
          </DropdownMenuLabel>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <div className="p-2 flex justify-between">
            <span className="text-muted-foreground">Role </span>
            <span className="text-card-foreground">{userInfo.userRole}</span>
          </div>
        </DropdownMenuSub>
        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <LogoutButton />
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
