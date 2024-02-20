import { List } from "./list";
import NewButton from "./new-button";

const Sidebar = () => {
    return ( 
        <aside className="fixed z-[1] h-full w-[60px] bg-blue-950 flex items-center p-2 flex-col text-white gap-y-4">
          <List/>
          <NewButton/>
        </aside>
     );
}
 
export default Sidebar;