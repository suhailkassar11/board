import { Room } from "@/components/room";
import Canvas from "./_components/canvas";
import Loading from "./_components/canvas-loading";


interface BoardIdPageProps {
    params: {
        boardId: string;

    }
}

const BoardIdPage = ({params}:BoardIdPageProps) => {
    return ( <div className="h-full">
       <Room roomId={params.boardId} fallback={<Loading/>} >
       <Canvas boardId={params.boardId}/>
       </Room>
    </div> );
}
 
export default BoardIdPage;