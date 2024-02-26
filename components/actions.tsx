"use client"

import { DropdownMenuContentProps,} from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu";
import { Link2, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { useMutation} from "convex/react";
import { api } from "@/convex/_generated/api";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";
interface ActionsProps{
    children : React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?:DropdownMenuContentProps["sideOffset"];
    id:any;
    title:string;
}

export const Action=({id,title,children,side,sideOffset}:ActionsProps)=>{
    const {onOpen} = useRenameModal()
    const remove=useMutation(api.board.remove);
    const onDelete=()=>{
        remove({id:id}).then(()=>toast.success("board is deleted")).catch(()=>toast.error("Board is not deleted"))
    }
    const onCopy=()=>{
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`).then(()=>toast.success("Link Copied!")).catch(()=>toast.error("Link is not Copied"))
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent side={side} sideOffset={sideOffset} onClick={(e)=>e.stopPropagation()} className="w-60">
               <DropdownMenuItem onClick={onCopy}className="items-center hover:bg-gray-100 flex p-3 cursor-pointer">
                <Link2  className="h-4 w-4 mr-2"/>
                Copy board Link
               </DropdownMenuItem>
               <DropdownMenuItem onClick={()=>onOpen(id, title)} className="items-center hover:bg-gray-100 flex p-3 cursor-pointer">
                <Pencil className="h-4 w-4 mr-2"/>
                Rename
               </DropdownMenuItem>
               <ConfirmModal header="Delete Board" description="This will delete your board and all its content"  onConfirm={onDelete}>
               <Button variant="ghost" className="items-center justify-start w-full flex p-3 text-sm font-normal">
                <Trash className="h-4 w-4 mr-2"/>
                Delete Board
               </Button>
               </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}