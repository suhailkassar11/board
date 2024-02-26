"use client";

import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useOrganization } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import {toast} from "sonner";

const NewBoardButton = () => {
    const {organization}= useOrganization()
    const router=useRouter()
    const create = useMutation(api.board.create)

    const onClick=()=>{
        if(!organization) return
        create({
            orgId:organization.id,
            title:"untitled"
        }).then((id)=>{
          toast.success("Board created")
          router.push(`board/${id}`)
        }).catch(()=>toast.error("Failed to create board"))
    }
  return (
  <button onClick={onClick} className={cn("col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6")}>
        <Plus className="h-12 w-12 text-white stroke-1"/>
        <p className="text-xs text-white font-light">New Board</p>
  </button>
)};

export default NewBoardButton;
