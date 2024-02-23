"use client"

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface boardFooterProps{
    authorLabel:string;
    createdAtLabel:string;
    isFavorite:boolean;
    title:string;
    disabled:boolean;
    onClick:()=>void
}

const Footer = ({disabled,onClick,title,isFavorite,authorLabel,createdAtLabel}:boardFooterProps) => {
    return ( 
        <div className="relative bg-white p-3">
            <p className="text-[13px] truncate max-w-[calc(100%-20%)]">
            {title}
            </p>
            <p className="opacity-0 transition-opacity text-[11px] group-hover:opacity-100 text-muted-foreground truncate">{authorLabel}, {createdAtLabel}</p>
            <button onClick={onClick} disabled={disabled} className={cn("opacity-0 group-hover:opacity-100 transition text-blue-800 absolute right-3 top-3 text-muted-foreground ",disabled && "cursor-not-allowed opacity-75")}>
                <Star className={cn("h-4 w-4",isFavorite?"fill-blue-600":"fill-white")}/>
            </button>
        </div>
     );
}
 
export default Footer;