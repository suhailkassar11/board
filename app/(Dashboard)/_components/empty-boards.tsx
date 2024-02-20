import { Button } from "@/components/ui/button";
import Image from "next/image";

const EmptyBoards = () => {
    return ( 
        <div className="flex h-full flex-col items-center justify-center">
            <Image 
            width={165} 
            height={165} src="note.svg" alt="emptySearch"
            />
            <h2 className="text-2xl font-semibold mt-2">
                No Board found
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
                Create your board
            </p>
            <Button variant="outline" className="mt-4 text-lg font-semibold" size="lg">
                Create Board
            </Button>
        </div>
     );
}
 
export default EmptyBoards;