"use client";
//poore dropdown ko manage karta hai.
// DropdownMenuTrigger jis par click karoge, jaise PS button.
//DropdownMenuSeparator- it create lien to seprate content
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { User } from "better-auth";
import Link from "next/link";
import { LogOut, PenSquare, UserIcon } from "lucide-react";
import { useState } from "react";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user: User;
}

function UserMenu({ user }: UserMenuProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()

  const getInitials = (name: string) => {
    return name
      .split(" ") //split on space and array form
      .map((n) => n[0]) //loop run on both element 0 index return
      .join("") //join both together
      .toUpperCase();

    //return PS if parthesh singh
  };
  //Iska kaam hai inner div ko position karna — jaise left side mein rakhna aur vertically center kar

  const handleLogout = async () => {

    setIsLoading(true)
    try{

        await signOut({
            fetchOptions :{
                onSuccess:()=>{
                    toast('You have been logged Out successfully')
                    router.refresh()
                }

            }
        })


    }catch(e){
        console.log(e)
        toast('Failed to LogOut ! try again')
    } finally{
        setIsLoading(false)
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="cursor-pointer"
        render={
          <Button
            variant={"ghost"}
            className="relative h-8 w-8 rounded-bl-full"
          >
            <Avatar className="h-8 w-8 ">
              <AvatarFallback>
                {getInitials(user?.name) || "USER"}
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className=" flex flex-col space-y-1 leading-none">
            <p className="font-bold">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          render={
            <Link href="/profile">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          }
        />

        <DropdownMenuItem
          className="cursor-pointer"
          render={
            <Link href="/post/create">
              <PenSquare className="mr-2 h-4 w-4" />
              <span>Create Post </span>
            </Link>
          }
        />
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}  //disabled={isLoading} → jab isLoading true hoga, tab Logout item disable ho jayega.
          disabled={isLoading}
          className="cursor-pointer"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span> {isLoading ? "Logging out...." : "Logout"} </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
