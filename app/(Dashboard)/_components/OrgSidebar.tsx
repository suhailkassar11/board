"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Poppins } from "next/font/google"
import { OrganizationSwitcher } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Star } from "lucide-react"
import { useSearchParams } from "next/navigation"
const font=Poppins({
  subsets:["latin"],
  weight:["600"],
})

const OrgSidebar = () => {
  const searchParams=useSearchParams()
  const favorites=searchParams.get("favorites")==="true" ? true : false;
  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-6 h-full ">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image
            src="logo.svg"
            alt="logo"
            height={60}
            width={60}
          />
          <span className={cn("font-semibold text-2xl",font.className)}>WhiteBoard</span>
        </div>
      </Link>
      <OrganizationSwitcher
      hidePersonal
      appearance={{
        elements:{
          rootBox:{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            width:"100%"
          },
          organizationSwitcherTrigger:{
            padding:"6px",
            width:"100%",
            borderRadius:"8px",
            border:"1px solid #E5E7EB",
            justifyContent:"space-between",
            backgroundColor:"white"
          }
        }
      }}/>
      <div>
        <Button asChild size="lg" className="font-normal justify-start px-2 w-full" variant={favorites?"ghost":"secondary"}>
          <Link className="flex" href="/">
            <LayoutDashboard className="h-4 w-4 mr-2"/>
            TeamBoard
          </Link>
        </Button>
        <Button asChild size="lg" className="font-normal justify-start px-2 w-full" variant={favorites?"secondary":"ghost"}>
          <Link className="flex" href={{
            pathname:"/",
            query:{favorites:true}
          }}>
            <Star className="h-4 w-4 mr-2"/>
            FavouriteBoard
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default OrgSidebar
