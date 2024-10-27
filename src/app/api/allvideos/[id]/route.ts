import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../lib/mongo";
import { embed } from "../../lib/embedding";
import { Video } from "../../lib/model/videoModel";

export async function GET(req : NextRequest){
    await connectDB();

    const id = req.url.split("allvideos/")[1]

    const video = await Video.findById(id)
    if(!video) return NextResponse.json({message : "Video not found"})
    const queryVector = await embed(video?.title)
    const result = await Video.aggregate([
        { 
            $vectorSearch:{
                limit :4,
                numCandidates :1024,
                queryVector : queryVector ,
                index : "vector_index",
                path : "embeddings"
            }
        }
    
    ])

    return NextResponse.json({video : video , similarVideos : result} )
}
