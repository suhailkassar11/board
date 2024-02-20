"use client"
import Image from "next/image";
import {CreateOrganization } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

const EmptyOrg = () => {
    
    return ( 
        <div className="h-full flex flex-col items-center justify-center">
             <Image height={200} width={200} src="/elements.svg" alt="empty"/>
             <h2 className="text-2xl font-semibold mt-6">
                Welcome to Drawing Board
             </h2>
             <p className="text-muted-foreground mt-2 text-sm ">Create an organization to get started</p>
             <Dialog>
                <DialogTrigger asChild>
                    <Button className="mt-2 items-center flex justify-center" variant="outline" size="lg"> <Plus/><span>Create Organization</span> </Button>
                </DialogTrigger>
                <DialogContent>
                    <CreateOrganization/>
                </DialogContent>
             </Dialog>
        </div>
     );
}
 
export default EmptyOrg;