import { getServerSession, Session } from "next-auth";
import dbConnect from "@/db/dbConnect";
import Artist from "@/db/schema/artist";
import Bookmark from "@/db/schema/bookmark";
import { ArtistData } from "@/types/_type";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    userId: string;
    artistId: string;
  };
};

export async function GET(request: NextRequest, context: Context) {
  const {
    params: { userId, artistId },
  } = context;
  try {
    dbConnect();
    const bookmark = await Artist.findOne({
      _id: artistId,
      bookmark: userId,
    });

    return NextResponse.json(bookmark);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function POST(request: Request) {
  const {
    body: { userId, artistId },
  } = await request.json();

  try {
    dbConnect();
    const isBookmark = await Artist.findOne({
      _id: artistId,
      bookmark: userId,
    });
    if (!isBookmark) {
      const currentBookmark = await Artist.findOne({
        _id: artistId,
      });
      await Artist.updateOne(
        {
          _id: artistId,
        },
        [{ $set: { bookmark: [...currentBookmark.bookmark, userId] } }]
      );
      return NextResponse.json("북마크로 등록하였습니다.");
    } else {
      return NextResponse.json("이미 등록하였습니다.");
    }
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function DELETE(request: NextRequest, context: Context) {
  try {
    dbConnect();
    const {
      params: { userId, artistId },
    } = context;
    console.log(userId);
    console.log(artistId);
    const isBookmark = await Artist.findOne({
      _id: artistId,
      bookmark: userId,
    });

    if (isBookmark) {
      const deleteBookmark = isBookmark.bookmark.filter(
        (b: string) => b !== userId
      );
      await Artist.updateOne({ _id: artistId, bookmark: userId }, [
        { $set: { bookmark: deleteBookmark } },
      ])
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      
      return NextResponse.json("북마크를 삭제하였습니다..");
    } else {
      return NextResponse.json("북마크를 먼저 등록해주세요.");
    }
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
