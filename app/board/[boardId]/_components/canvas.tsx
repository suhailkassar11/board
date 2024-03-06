"use client";

import { useCallback, useState } from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { useSelf } from "@/liveblocks.config";
import { CanvasState, CanvasMode, Camera } from "@/types/canvas";
import { useCanRedo, useCanUndo, useHistory,useMutation } from "@/liveblocks.config";
import {CursorPresence }from "./cursor_presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";

const MAX_LAYERS = 100;

interface canvasProps {
  boardId: string;
}

const Canvas = ({ boardId }: canvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera,setCamera]=useState<Camera>({x:0,y:0})
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const info = useSelf((me) => me.info);

  const onWheel=useCallback((e:React.WheelEvent)=>{
    setCamera((camera)=>({
      x:camera.x-e.deltaX,
      y:camera.y-e.deltaY
    }))
  },[])

  const onPointerMove=useMutation(({setMyPresence},e:React.PointerEvent)=>{
    e.preventDefault();
    const current=pointerEventToCanvasPoint(e,camera)
    setMyPresence({cursor:current})
  },[])

  const onPointerLeave=useMutation(({setMyPresence})=>{
    setMyPresence({cursor:null})
  },[])

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none ">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        canRedo={canRedo}
        undo={history.undo}
        Redo={history.redo}
      />
      <svg onWheel={onWheel} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className="h-[100vh] w-[100vw]">
        <g style={{transform:`translate(${camera.x}px, ${camera.y}px)`}}>
          <CursorPresence/>
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
