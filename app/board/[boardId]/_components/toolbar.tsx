import { CanvasState, CanvasMode, LayerType } from "@/types/canvas";
import { ToolButton } from "./tool-button";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  Redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const Toolbar = ({
  canvasState,
  setCanvasState,
  canUndo,
  canRedo,
  undo,
  Redo,
}: ToolbarProps) => {
  return (
    <div className="absolute top-[50%] left-2 -translate-y-[50%] flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 gap-y-1 flex flex-col items-center shadow-md">
        <ToolButton
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          label="select"
          icon={MousePointer2}
        />
        <ToolButton
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType===LayerType.Text}
          onClick={() => setCanvasState({ mode: CanvasMode.Inserting,layerType: LayerType.Text})}
          label="Text"
          icon={Type}
        />
        <ToolButton
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType===LayerType.Note}
          onClick={() => setCanvasState({ mode: CanvasMode.Inserting,layerType:LayerType.Note })}
          label="stick note"
          icon={StickyNote}
        />
        <ToolButton
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType===LayerType.Rectangle}
          onClick={() => setCanvasState({ mode: CanvasMode.Inserting,layerType:LayerType.Rectangle })}
          label="Rectangle"
          icon={Square}
        />
        <ToolButton
          isActive={canvasState.mode === CanvasMode.Inserting && canvasState.layerType===LayerType.Ellipse}
          onClick={() => setCanvasState({ mode: CanvasMode.Inserting,layerType:LayerType.Ellipse })}
          label="Ellipse"
          icon={Circle}
        />
        <ToolButton
          isActive={canvasState.mode === CanvasMode.Pencil }
          onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
          label="Pen"
          icon={Pencil}
        />
      </div>
      <div className="flex flex-col items-center bg-white rounded-md shadow-md p-1.5">
        <ToolButton
          isDisabled={!canUndo}
          onClick={undo}
          label="Undo"
          icon={Undo2}
        />
        <ToolButton
          isDisabled={!canRedo}
          onClick={Redo}
          label="Redo"
          icon={Redo2}
        />
      </div>
    </div>
  );
};

export default Toolbar;
