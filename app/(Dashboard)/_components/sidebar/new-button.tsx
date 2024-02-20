"use client"
import { Dialog, DialogTrigger,DialogContent } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Hint } from "@/components/hint";

const NewButton = () => {
    return (   
            <Dialog>
        <DialogTrigger asChild>
            <div className="aspect-square">
        <Hint side="right" align="end" label="create Organization">
                <button className="rounded-lg flex items-center h-full w-full opacity-60 hover:opacity-100 transition justify-center p-2 bg-gray-400">
                    <Plus className="text-white"/>
                </button>
            </Hint>
            </div>
        </DialogTrigger>
        <DialogContent className="p-0 bg-transparent border-none max-w-[400px]">
            <CreateOrganization/>
        </DialogContent>
    </Dialog> 
        
    );
}
 
export default NewButton;