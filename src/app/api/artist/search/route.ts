import dbConnect from '@/db/dbConnect';
import Artist from '@/db/schema/artist';
import { NextRequest, NextResponse } from 'next/server';
 
 export async function GET(request: NextRequest) {
    const page = Number(request.nextUrl.searchParams.get("page"));
    const size = Number(request.nextUrl.searchParams.get("size"));
    const name = request.nextUrl.searchParams.get("name")
    const startIndex = page === 1 ? 0 : page > 1 ? (page - 1) * size : -1;
    try {
      dbConnect();
      const artists = Artist;
  
      const findArtist = await artists.find({ "korName" : { $regex : name } }).skip(startIndex).limit(size);
      return NextResponse.json(findArtist);
    } catch (error) {
      console.error(error);
      NextResponse.json({ message: "Internal server error" });
    }
 }