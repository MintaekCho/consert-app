import dbConnect from "@/db/dbConnect";
import Bookmark from "@/db/schema/bookmark";
import { NextRequest, NextResponse } from "next/server";
type Props = {
    params: {
        userId: string;
    }
}

export async function GET(request: NextRequest, {params: {userId}}: Props) {
    try {
      dbConnect();
      const bookmark = await Bookmark.find({
        userId: userId,
      });
  
      return NextResponse.json(bookmark);
    } catch (error) {
      console.error(error);
      NextResponse.json({ message: "Internal server error" });
    }
  }