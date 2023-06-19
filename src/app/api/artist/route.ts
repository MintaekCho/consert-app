import dbConnect from "@/db/dbConnect";
import Artist from "@/db/schema/artist";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page"));
  const size = Number(request.nextUrl.searchParams.get("size"));
  try {
    dbConnect();
    const artists = Artist;

    const startIndex = page === 1 ? 0 : page > 1 ? (page - 1) * size : -1;
    const endIndex = startIndex + size - 1;
    const findArtists = await artists.find().skip(startIndex).limit(endIndex);

    return NextResponse.json(findArtists);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
