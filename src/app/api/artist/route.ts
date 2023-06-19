import dbConnect from "@/db/dbConnect";
import Artist from "@/db/schema/artist";
import ConsertRank from "@/db/schema/consertRank";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    dbConnect();
    const artists = Artist;

    const findArtists = await artists.find({}).limit(12);
    return NextResponse.json(findArtists);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
