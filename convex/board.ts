import {v} from "convex/values"
import {mutation} from "./_generated/server";

const images=[
    "/plcaholder/1.svg",
    "/plcaholder/2.svg",
    "/plcaholder/3.svg",
    "/plcaholder/4.svg",
    "/plcaholder/5.svg",
    "/plcaholder/6.svg",
    "/plcaholder/7.svg",
    "/plcaholder/8.svg",
    "/plcaholder/9.svg",
    "/plcaholder/10.svg",
]

export const create=mutation({
    args:{orgId:v.string(),title:v.string()},
    handler:async(ctx,args)=>{
        const identity= await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Unauthorized");
        }

        const randomImage=images[Math.floor(Math.random() * images.length)]

        const board = await ctx.db.insert("boards",{title:args.title,
        orgId:args.orgId,
        authorId:identity.subject,
        authorName:identity.name!,
        imageUrl:randomImage,
    })
    return board
    }
})