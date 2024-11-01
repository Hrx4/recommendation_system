import { NextResponse } from "next/server";
import { connectDB } from "../lib/mongo";
import { Video } from "../lib/model/videoModel";

export async function GET(){
    await connectDB();

    const videos = await Video.find()
    return NextResponse.json(videos)
}
