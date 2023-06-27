import dbConnect from "@/db/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Artist from "@/db/schema/artist";
import { ArtistData } from "@/types/_type";

export async function PATCH(request: Request) {
  // const { userId, artistName } = await request.json();
  // try {
  //   dbConnect();
  //   const artist = Artist;
  //   // 북마크 필드에 유저 데이터 insert

  //   const dbArtist: ArtistData | null = await artist.findOne({
  //     korName: artistName,
  //     bookmark: userId
  //   });
  //   dbArtist && console.log(typeof dbArtist.bookmark);
  //   // const isBook = dbArtist?.bookmark?.includes(userId)
  //   console.log(dbArtist);
  //   if (dbArtist) {
  //     const newBookmark = [userId];
  //     console.log(newBookmark);
  //     // await artist
  //     //   .updateOne({ korName: artistName }, [
  //     //     { $set: { bookmark: '55555' } },
  //     //   ]) //
  //     //   .then((result) => {
  //     //     console.log(result);
  //     //   });
  //     return NextResponse.json("ok");
  //   } else {
  //     console.log(1);
  //     const removeBookmark = dbArtist?.bookmark.filter((b) => b !== userId);
  //     await artist.updateOne({ korName: artistName }, [
  //       { $set: { bookmark: removeBookmark } },
  //     ]);
  //     return NextResponse.json("삭제");
  //   }
  // } catch (error) {
  //   console.error(error);
  //   NextResponse.json({ message: "Internal server error" });
  // }
}
