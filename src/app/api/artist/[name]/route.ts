import dbConnect from '@/db/dbConnect';
import Artist from '@/db/schema/artist';
import { NextResponse } from 'next/server';
 
 export async function GET(request: Request, context: { params: {name: string} }) {
    const {params: {name}} = context
    const NewName = name.toUpperCase().split(' ').join('').trim();
    console.log(NewName)

    try {
      dbConnect();
      const artists = Artist;
  
      const findArtist = await artists.findOne({'korName' : NewName});
      return NextResponse.json(findArtist);
    } catch (error) {
      console.error(error);
      NextResponse.json({ message: "Internal server error" });
    }
 }