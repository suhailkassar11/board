"use client";

import {
  CanvasState,
  CanvasMode,
  Camera,
  Color,
  LayerType,
  Layer,
  Point,
  Side,
  XYWH,
} from "@/types/canvas";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
} from "@/liveblocks.config";
import {nanoid} from "nanoid"
import { useCallback, useMemo, useState } from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import { useSelf, useStorage } from "@/liveblocks.config";
import { CursorPresence } from "./cursor_presence";
import { connectionIdToColor, pointerEventToCanvasPoint } from "@/lib/utils";
import { LiveObject } from "@liveblocks/client";
import {LayerPreview} from "./layer-preview";
import {SelectionBox} from "./selection-box";

const MAX_LAYERS = 100;

interface canvasProps {
  boardId: string;
}

const Canvas = ({ boardId }: canvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const info = useSelf((me) => me.info);

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Note
        | LayerType.Path
        | LayerType.Rectangle
        | LayerType.Text,
      position: Point
    ) => {
      const liveLayers=storage.get("layers")
      if(liveLayers.size>= MAX_LAYERS){
        return
      }
      const liveLayerIds=storage.get("layerIds")
      const layerId=nanoid()
      const layer=new LiveObject({
        type:layerType,
        x:position.x,
        y:position.y,
        height:100,
        width:100,
        fill:lastUsedColor
      });
      liveLayerIds.push(layerId);
      liveLayers.set(layerId,layer);
      setMyPresence({selection:[layerId]}, {addToHistory:true})
      setCanvasState({mode:CanvasMode.None})
    },
    [lastUsedColor]
  );

  const onResizeHandlePointerDown=useCallback((corner:Side,initialBounds:XYWH)=>{
    console.log(`corner=${corner}, bounds=${initialBounds}`);
    
    history.pause()
    setCanvasState({
      mode:CanvasMode.Resizing,
      initialBounds,
      corner,
    })
  },[history])
  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);
      setMyPresence({ cursor: current });
    },
    []
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerUp=useMutation(({},e)=>{
    const point = pointerEventToCanvasPoint(e,camera);
    if(canvasState.mode===CanvasMode.Inserting){
      insertLayer(canvasState.layerType,point);
    }else{
      setCanvasState({
        mode:CanvasMode.None,
      })
    }
    history.resume()
  },[camera,canvasState,history,insertLayer])

  const selections = useOthersMapped((other)=> other.presence.selection)

  const onLayerPointerDown = useMutation(({self,setMyPresence}, e:React.PointerEvent,layerId:string)=>{
   if(canvasState.mode===CanvasMode.Pencil || canvasState.mode===CanvasMode.Inserting){
    return
   }
   history.pause();
   e.stopPropagation();
   const point = pointerEventToCanvasPoint(e,camera);
   if(!self.presence.selection.includes(layerId)){
    setMyPresence({selection:[layerId]}, {addToHistory:true});
   }
   setCanvasState({mode:CanvasMode.Translating, current:point})
  },[setCanvasState,camera,history,canvasState.mode])

  const layerIdsToColorSelection = useMemo(()=>{
    const layerIdsToColorSelection:Record<string, string>={};
    for(const user of selections){
      const [connectionId,selection]=user;
      for (const layerId of selection){
        layerIdsToColorSelection[layerId]=connectionIdToColor(connectionId)
      }
    }
    return layerIdsToColorSelection;
  },[selections])
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
      <svg
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        className="h-[100vh] w-[100vw]"
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layerIds.map((layerId)=>(
            <LayerPreview 
            key={layerId}
            id={layerId}
            onLayerPointerDown={onLayerPointerDown}
            selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox
            onResizeHandlePointerDown={onResizeHandlePointerDown}
          />
          <CursorPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
