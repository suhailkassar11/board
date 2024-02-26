"use client"

import { useRenameModal } from "@/store/use-rename-modal";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

export const RenameModal = () => {
    const {
        isOpen,
        onClose,
        initialValue
    }=useRenameModal()
    const[title,setTitle]=useState(initialValue.title)
    useEffect(()=>{
        setTitle(initialValue.title)
    },[initialValue.title])
    const update=useMutation(api.board.update)
    const onSubmit:FormEventHandler<HTMLFormElement>=(e)=>{
        e.preventDefault()
        update({id:initialValue.id as Id<any>,title:title}).then(()=>{toast.success("Title updated Successfully");onClose()}
        ).catch(()=>toast.error("Title is not Updated"))
    }
    return ( 
       <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Edit board title
                </DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Enter a new title for this board
            </DialogDescription>
            <form  onSubmit={onSubmit}  className="space-y-4">
                <Input disabled={false} onChange={(e)=>setTitle(e.target.value)} value={title}/>
                <DialogFooter>
                <DialogClose asChild>
                    <Button  type="button" variant="outline">
                        Close
                    </Button>
                </DialogClose>
                <Button type="submit">
                    Save
                </Button>
                </DialogFooter>
            </form>
        </DialogContent>
       </Dialog>
     );
}
 