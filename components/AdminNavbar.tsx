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
import type { userInfoType } from "@/typings";
import { UserIcon } from "lucide-react";

export default function AdminNavbar({
  userInfo,
}: {
  userInfo: userInfoType | undefined;
}) {
  if (!userInfo) return null;
  return (
    <div className="flex justify-end p-2 shadow-sky-50 shadow-lg mb-10">
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none select-none">
          <Avatar className="shadow-lg">
            {/* <AvatarImage src="https://github.com/shadcasdfn.png" /> */}
            <AvatarFallback className="bg-sky-500">
              <UserIcon color="white" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
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
    </div>
  );
}
