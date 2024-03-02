import { Loader } from "lucide-react";

const Loading = () => {
    return ( <main className="h-full items-center flex justify-center w-full relative bg-neutral-100 touch-none ">
  <Loader className="h-6 w-6 text-muted-foreground animate-spin"/>
  </main> );
}
 
export default Loading;