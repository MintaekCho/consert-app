import { AlbumData, ArtistAlbumData } from './../../../../types/_type';
import dbConnect from "@/db/dbConnect";
import Album from "@/db/schema/album";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");
  try {
    dbConnect();
    const albums = Album;

    const findAlbums: ArtistAlbumData | null = await albums.findOne({'artistName' : name})
    // console.log(AllAlbums.length)
    const response: AlbumData[] | null = findAlbums && findAlbums.albums.sort((a:AlbumData, b:AlbumData) => Number(a.releaseDate.split('.').join('')) - Number(b.releaseDate.split('.').join('')));
    const res = response?.splice(response.length-5, response.length-1)

    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
