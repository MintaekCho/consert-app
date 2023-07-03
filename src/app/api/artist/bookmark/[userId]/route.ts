import dbConnect from "@/db/dbConnect";
import Artist from "@/db/schema/artist";
import Bookmark from "@/db/schema/bookmark";
import { NextRequest, NextResponse } from "next/server";
type Props = {
  params: {
    userId: string;
  };
};

export async function GET(request: NextRequest, { params: { userId } }: Props) {
  try {
    dbConnect();
    // const bookmark = await Bookmark.find({
    //   userId: userId,
    // });
    const bookmarks = await Artist.find({
      bookmark: userId
    })

    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
