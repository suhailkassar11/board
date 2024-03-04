import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar";
import { Hint } from "@/components/hint";

interface AvatarProps{
    src?:string;
    name?:string;
    fallback?:string;
    borderColor?:string;
}

export const UserAvatar=({src,name,fallback,borderColor}:AvatarProps)=>{
    return(
        <Hint sideOffset={18} label={name || "teammate"} side="bottom">
            <Avatar style={{borderColor}} className="h-8 w-8 border-2">
                <AvatarImage src={src}/>
                <AvatarFallback className="text-xs font-semibold">
                    {fallback}
                </AvatarFallback>
            </Avatar>
        </Hint>
    )
}