import { Tooltip,TooltipContent,TooltipProvider,TooltipTrigger } from "./ui/tooltip";
interface HintProps{
    label:string;
    side:"left" | "top" | "bottom" | "right"
    children:React.ReactNode
    align:"center" | "start" | "end"
    sideOffset?:number
    alignOffset?:number
}
export const Hint=({label,side,children,align,sideOffset,alignOffset}:HintProps)=>{
    return(
        <TooltipProvider delayDuration={100}>
            <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>
            <TooltipContent className="text-white bg-black border-black"
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset} >
                <p>{label}</p>
            </TooltipContent>
        </Tooltip>
        </TooltipProvider>
    )
}
