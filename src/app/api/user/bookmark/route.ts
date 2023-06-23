import { UserData } from "./../../../../db/schema/user";
import dbConnect from "@/db/dbConnect";
import User from "@/db/schema/user";
import { NextRequest, NextResponse } from "next/server";
import { ArtistData } from "@/types/_type";

export async function PATCH(request: NextRequest) {
  const { email, artist }: { email: string; artist: ArtistData } =
    await request.json();
  try {
    dbConnect();
    const user = User;
    const dbUser: UserData | null = await user.findOne({
      email: email,
    });
    console.log(dbUser);
    const bookmark = dbUser && dbUser.bookMarks;
    const isBookmark = bookmark?.filter((b) => b.korName === artist.korName);
    const removeBookmark = bookmark?.filter((b) => b.korName !== artist.korName);
    
    console.log(bookmark)
    console.log(isBookmark)
    console.log(removeBookmark)

    if (isBookmark && isBookmark?.length > 0  ) {
      await user.updateOne({ email: email }, { bookMarks: removeBookmark });
      return NextResponse.json("북마크가 삭제되었습니다.");
    } else {
      bookmark && await user.updateOne({ email: email }, { bookMarks: [...bookmark, artist] });
      return NextResponse.json("북마크로 등록되었습니다.");
    }

    
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
