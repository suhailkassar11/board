"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const EmptyBoards = () => {
    const {organization}= useOrganization()
    const router=useRouter()
    const create = useMutation(api.board.create)

    const onClick=()=>{
        if(!organization) return
        create({
            orgId:organization.id,
            title:"untitled"
        }).then((id)=>{
            toast.success("Board created");
            router.push(`board/${id}`)
        })
    }

    return ( 
        <div className="flex h-full flex-col items-center justify-center">
            <Image 
            width={165} 
            height={165} src="note.svg" alt="emptySearch"
            />
            <h2 className="text-2xl font-semibold mt-2">
                No Board found
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
                Create your board
            </p>
            <Button onClick={onClick} variant="outline" className="mt-4 text-lg font-semibold" size="lg">
                Create Board
            </Button>
        </div>
     );
}
 
export default EmptyBoards;