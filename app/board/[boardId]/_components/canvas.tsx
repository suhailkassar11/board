"use client"

import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

interface canvasProps{
  boardId:string;
}

const Canvas = ({boardId}:canvasProps) => {
    return ( 
    <main className="h-full w-full relative bg-neutral-100 touch-none ">
      <Info/>
      <Participants/>
      <Toolbar/>
    </main> );
}
 
export default Canvas;