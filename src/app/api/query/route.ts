import { NextRequest, NextResponse } from "next/server";
import { embed } from "../lib/embedding";
import { Video } from "../lib/model/videoModel";

export async function POST (req : NextRequest){

    try {
        const {videoQuery} = await req.json();
    if (!videoQuery) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
      }
      const queryVector = await embed(videoQuery)

      
    const result = await Video.aggregate([
        { 
            $vectorSearch:{
                limit :4,
                numCandidates :1024,
                queryVector : queryVector ,
                index : "vector_index",
                path : "embeddings"
            }
        },
        {
            $project:{
                embeddings:0
            }
        }
    
    ])

    return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Server error', error: error }, { status: 500 });
    }

}