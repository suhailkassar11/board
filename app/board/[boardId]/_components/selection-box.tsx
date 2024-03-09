"use Client"
import { Side, XYWH } from "@/types/canvas";
import {memo} from "react"

interface SelectionBoxProps{
    onResizeHandlePointerDown:(corner:Side, initialBounds:XYWH)=>void;
}

const HANDLE_WIDTH = 8;

export const SelectionBox = memo(({onResizeHandlePointerDown}:SelectionBoxProps) => {
    return ( <div>
        selection box
    </div> );
})

SelectionBox.displayName="SelectionBox"
 