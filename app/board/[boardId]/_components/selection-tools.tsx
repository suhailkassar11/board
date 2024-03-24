"use client"


import { useMutation, useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas";
import { memo, useEffect } from "react";
import { ColorPicker } from "./color-picker";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

interface SelectionToolsProps{
    camera:Camera;
    setLastUsedColor:(color:Color)=> void;
}

export const SelectionTools=memo(({camera,setLastUsedColor}:SelectionToolsProps)=>{
    const selection=useSelf((me)=>me.presence.selection);

    const moveToBack=useMutation(({storage})=>{
        const liveLayerIds=storage.get("layerIds")
        const indices:number[]=[]

        const arr = liveLayerIds.toArray()

        for(let i=0; i<arr.length;i++){
            if(selection.includes(arr[i])){
                indices.push(i)
            }
        }
        for(let i=0;i<indices.length;i++){
            liveLayerIds.move(indices[i],i)
        }
    },[selection])
    const moveToFront=useMutation(({storage})=>{
        const liveLayerIds=storage.get("layerIds")
        const indices:number[]=[]

        const arr = liveLayerIds.toArray()

        for(let i=0; i<arr.length;i++){
            if(selection.includes(arr[i])){
                indices.push(i)
            }
        }
        for(let i=indices.length-1;i>=0;i--){
            liveLayerIds.move(indices[i],arr.length-1-(indices.length-1-i))
        }
    },[selection])

    const setFill=useMutation(({storage},fill:Color,)=>{
        const liveLayers=storage.get("layers");
        setLastUsedColor(fill)

        selection.forEach((id)=>{
            liveLayers.get(id)?.set("fill",fill);
        })
    },[selection,setLastUsedColor])
    const selectionBounds = useSelectionBounds()
    const deleteLayers=useDeleteLayers()

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Delete') {
            deleteLayers(); 
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [deleteLayers]);

    if(!selectionBounds){
        return null;
    }
    const x= selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y 
    return (
        <div className="absolute rounded-xl bg-white p-3 flex shadow-sm border select-none" style={{transform:`translate(calc(${x}px-50%),calc(${y-16}px -100%))`}}>
            <ColorPicker onChange={setFill} />
            <div className="flex flex-col gap-y-0.5">
                <Hint label="Bring to front" side="right">
                    <Button onClick={moveToFront} variant="board" size="icon">
                        <BringToFront/>
                    </Button>
                </Hint>
                <Hint label="sent to back" side="right">
                    <Button onClick={moveToBack} variant="board" size="icon">
                        <SendToBack/>
                    </Button>
                </Hint>
            </div>
            <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
                <Hint label="Delete" side="right">
                    <Button variant="board" size="icon" onClick={deleteLayers}>
                        <Trash2/>
                    </Button>
                </Hint>
            </div>
        </div>
        
    )
})

SelectionTools.displayName="SelectionTools"