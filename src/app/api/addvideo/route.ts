import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../lib/mongo';
import { embed } from '../lib/embedding';
import {v2 as cloudinary} from "cloudinary"
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { Video } from '../lib/model/videoModel';

// Named export for handling POST request
export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB();

    cloudinary.config({ 
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
      api_key: process.env.CLOUDINARY_API_KEY, 
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    // Parse the request body
    const data = await req.formData(); // Use req.json() to parse JSON request body
    // Validate the required fields
    const title = data.get("title") as string;
    const url = data.get("url") as string;
    const description = data.get("description") as string;
    const category = data.get("category") as string;
    const thumbnail = data.get("thumbnail") as File;

    if (!title || !url || !description || !thumbnail || !category) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

      const bytes = await thumbnail.arrayBuffer()
    const buffer = Buffer.from(bytes)
    // const currentDate = new Date().toISOString()
    const path = join('./_temp' ,thumbnail.name)
    await writeFile(path , buffer)
    const photo = await cloudinary.uploader.upload(path )

    // Generate embeddings for the title
    const embeddings = await embed(title);
    // Create a new video document in MongoDB
    const createdVideo = await Video.create({
      title,
      embeddings,
      url,
      description,
      thumbnail : photo.secure_url,
      category,
    });
    return NextResponse.json(createdVideo, { status: 201 });
  } catch (error: any) {
    console.error(error);

    // Return error response
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
