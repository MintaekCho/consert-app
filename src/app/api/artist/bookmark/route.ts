import dbConnect from "@/db/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { ArtistData } from "@/types/_type";
import Bookmark from "@/db/schema/bookmark";

export async function POST(request: Request) {
  const {
    body: { userId, artist },
  } = await request.json();
  try {
    dbConnect();
    const isBookmark = await Bookmark.findOne({
      artist,
      userId,
    });
    if (!isBookmark) {
      await Bookmark.create({ artist, userId })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      return NextResponse.json("북마크로 등록하였습니다.");
    } else {
      return NextResponse.json("이미 등록하였습니다.");
    }
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const artistId = request.nextUrl.searchParams.get("artistId");
  try {
    dbConnect();
    const bookmark = await Bookmark.findOne({
      userId: userId,
      "artist._id": artistId,
    });

    return NextResponse.json(bookmark);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function DELETE(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const artistId = request.nextUrl.searchParams.get("artistId");

  try {
    dbConnect();

    const isBookmark = await Bookmark.findOne({
      "artist._id": artistId,
      userId: userId,
    });
    if (isBookmark) {
      await Bookmark.deleteOne({ "artist._id": artistId, userId: userId })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      return NextResponse.json("북마크를 삭제하였습니다..");
    } else {
      return NextResponse.json("이미 등록하였습니다.");
    }
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
