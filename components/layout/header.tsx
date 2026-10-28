"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import UserMenu from "../auth/user-menu";
import ThemeToggle from "../theme/theme-toggle";


function Header() {

  const {data:session, isPending} = useSession()  //data property ko session naam ke variable mein store karo.
    const router = useRouter()
    
  const navItems = [

    
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Create",
      href: "/post/create", 
    },
  ];

  return (
    <header className="border-b bg-background sticky top-0 z-10  ">
      <div className="container max-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-xl">
           
            Next js 15 Blog
          </Link>
          {/* hide pixle before 740px */}
          <nav className="hidden md:flex item center gap-6">
            {navItems.map((navItem) => (
              <Link
                key={navItem.href}
                href={navItem.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                )}
              >
                {navItem.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
            <div className="hidden md:block">
                {/* keep placeholder for search */}
              

            </div>
            {/* placeholder for theme change */}
              <ThemeToggle />

                <div className=" flex items-center gap-2">

                  {
                    isPending ? null :
                    session?.user?(  //if session has user and this is true
                    <UserMenu user={session.user}/>    //component
                    ) : (   //else render 
                       <Button 
                    className="cursor-pointer"
                      onClick={()=>router.push('/auth')} >

                        Login
                        
                    </Button>

                    )
                  }
                    

                </div>


        </div>
      </div>
    </header>
  );
}

export default Header;
