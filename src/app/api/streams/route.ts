import { prismaClient } from "@/lib/db";
import { YT_REGEX } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import {string, z} from 'zod'
 

const createStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})


export async function POST(req: NextRequest){
    try{
        const data = createStreamSchema.parse(await req.json())
        const isYt = data.url.match(YT_REGEX)
        if(!isYt)
{
    return NextResponse.json({
        message:"Wrong URL"
    },{status: 411})
}
const extractedId = data.url.split("?v=")[1];

prismaClient.stream.create({
            data:{userId: data.creatorId,
            url: data.url,
            extractedId,
            type: "Youtube"}

        })

       
        
    }catch(e){
        return NextResponse.json({
            message:"Error while adding a stream"
        },{status: 411})
    }
}