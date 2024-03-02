import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
  secret: "sk_dev_deZy9AxvNtaPq5dADx3vm43LFRr_mCkGUOh8ZVf2kJGJ6JNkbl8PPMws1gmgYWNs",
});

export const POST=async(request:Request)=>{
    const authorization=auth()
    const user = await currentUser()
    
    if(!authorization){
        return new Response("Unauthorized",{status:403})
    }
    const {room}=await request.json();
    const board=await convex.query(api.board.get,{id:room});

    if(board?.orgId!=authorization.orgId){
        return new Response("Unauthorized",{status:403})
    }
    const userInfo ={
        name:user?.firstName || "Anonymous",
        picture:user?.imageUrl!
    }   

    const session = liveblocks.prepareSession(
        user.id,
        {userInfo}
    )

    if(room){
        session.allow(room,session.FULL_ACCESS)
    }
    const { status, body } = await session.authorize();
    
  return new Response(body, { status });
}

