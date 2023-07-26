import dbConnect from "@/db/dbConnect";
import Artist from "@/db/schema/artist";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");
  try {
    dbConnect();
    const findArtist = await Artist.findOne({ korName: name });
    return NextResponse.json(findArtist);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
