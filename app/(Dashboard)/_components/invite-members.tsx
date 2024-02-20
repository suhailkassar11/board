import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/nextjs";
import { Plus } from "lucide-react";

const InviteMembers = () => {
    return ( 
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Plus/>
                    Invite Members
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 border-none bg-transparent max-w-[880px]">
                <OrganizationProfile/>
            </DialogContent>
        </Dialog>
     );
}
 
export default InviteMembers;