import Image from "next/image";
import Link from "next/link";
import Overlay from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Footer from "./board-footer";
import { Action } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

interface BoardCardProps {
    key:string;
    id:string;
    title:string;
    imageUrl:string;
    authorId:string;
    authorName:string;
    createdAt:number;
    orgId:string;
    isFavorite:boolean;

}

const BoardCard = ({id,title,imageUrl,authorId,authorName,orgId,createdAt,isFavorite}:BoardCardProps) => {
    const {userId}=useAuth()
    const authorLabel=userId===authorId?"You":authorName
    const createdAtLabel= formatDistanceToNow(createdAt,{addSuffix:true})
    const favorite=useMutation(api.board.favorite)
    const unfavorite=useMutation(api.board.unfavorite)
    const onClick=()=>{
        if(isFavorite){
            unfavorite({id:id as Id<any>}).then(()=>toast.success("unfavorite success")).catch(()=>toast.error("unable to unfavorite"))
        }else{
            favorite({
                id:id as Id<any>,
                orgId
            }).then(()=>toast.success("added to favorite")
            ).catch(()=>toast.error("unable to add in favorite"))
        }
    }
    return ( 
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden ">
                <div className="relative flex-1 bg-amber-50">
                    <Image
                        fill
                        src={imageUrl}
                        alt={title}
                        className="object-fit"
                    />
                    <Overlay/>
                    <Action id={id} side="right" title={title}>
                        <button className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"> 
                            <MoreHorizontal className="hover:opacity-100 opacity-75 text-white transition-opacity"/>
                        </button>
                    </Action>
                </div>
                <Footer
                    isFavorite={isFavorite}
                    title={title}
                    createdAtLabel={createdAtLabel}
                    authorLabel={authorLabel}
                    onClick={onClick}
                    disabled={false}
                />
            </div>
        </Link>
     );
}
 
export default BoardCard;