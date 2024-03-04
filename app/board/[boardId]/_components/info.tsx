"use client"

import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useQuery } from "convex/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { Action } from "@/components/actions";
import { Menu } from "lucide-react";

interface InfoProps{
    boardId:string
}

const font=Poppins({
    subsets:["latin"],
    weight:["600"]
})
const TabSeperator=()=>{
    return (
        <div className="text-neutral-300 px-1.5"></div>
    )
}
const Info = ({boardId}:InfoProps) => {
    const {onOpen}=useRenameModal()
    const data=useQuery(api.board.get,{id:boardId as Id<"boards">})

    if(!data){
        return ""
    }
    return ( 
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 flex items-center shadow-md">
        <Hint label="go to board" side="bottom" sideOffset={10}>
        <Button asChild className="px-2" variant="board">
           <Link href="/">
           <Image 
                src="/logo.svg"
                alt="logo"
                width={40}
                height={40}
            />
        <span className={cn("font-semibold text-xl ml-2 text-black",font.className)}>
            Board
        </span>
           </Link>
        </Button>
        </Hint>
        <TabSeperator/>
        <Hint side="bottom" label="Edit Title">
        <Button className="text-base font-normal px-2" variant="board" onClick={()=>onOpen(data._id,data.title)}> 
            {data.title}
        </Button>
        </Hint>
        <TabSeperator/>
        <Action title={data.title} id={data._id} side="bottom">
            <div>
                <Hint label="Board Menu" side="bottom">
                    <Button size="icon" variant="board">
                        <Menu/>
                    </Button>
                </Hint>
            </div>
        </Action>
    </div> );
}
 
export default Info;