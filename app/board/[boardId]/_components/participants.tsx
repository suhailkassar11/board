"use client"

import { connectionIdToColor } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";
import { useOthers,useSelf } from "@/liveblocks.config";

const MAX_SHOW_USERS=2

const Participants = () => {
    const users=useOthers()
    const currentUser=useSelf();
    const hasMoreUsers=users.length > MAX_SHOW_USERS;
    return ( 
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
        <div className="flex items-center gap-x-1">
            {users.slice(0,MAX_SHOW_USERS).map(({connectionId,info})=>{
                return(
                    <UserAvatar 
                        borderColor={connectionIdToColor(connectionId)}
                        key={connectionId}
                        src={info?.picture}
                        name={info?.name}
                        fallback={info?.name?.[0] || "T"}
                    />
                )
            })}
            {currentUser && (
                <UserAvatar 
                    src={currentUser.info?.picture || "T"}
                    name={`${currentUser.info?.name} (you)`}
                    fallback={currentUser.info?.name?.[0]}
                />
            )}
            {hasMoreUsers && (
                <UserAvatar
                    name={`${users.length - MAX_SHOW_USERS} more`}
                    fallback={`+ ${users.length}`}
                />
            )}
        </div>
    </div> );
}
 
export default Participants;