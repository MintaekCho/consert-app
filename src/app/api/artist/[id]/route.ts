import dbConnect from '@/db/dbConnect';
import Artist from '@/db/schema/artist';
import { NextResponse } from 'next/server';
 
 export async function GET(request: Request, context: { params: {id: string} }) {
    const {params: {id}} = context
    console.log(id)

    try {
      dbConnect();
      const artists = Artist;
  
      const findArtist = await artists.findOne({'_id' : id});
      return NextResponse.json(findArtist);
    } catch (error) {
      console.error(error);
      NextResponse.json({ message: "Internal server error" });
    }
 }