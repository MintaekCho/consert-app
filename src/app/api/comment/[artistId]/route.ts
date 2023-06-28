import dbConnect from "@/db/dbConnect";
import Comment from "@/db/schema/comment";
import { CommentData } from "@/types/_type";
import { getStringDate } from "@/utils/date";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: Request,
  context: { params: { artistId: string } }
) {
  const { body } = await request.json();
  const {
    params: { artistId },
  } = context;

  try {
    dbConnect();
    const createAt = getStringDate();
    console.log(createAt);
    const addPost = {
      ...body,
      createdAt: createAt,
      updatedAt: null,
      isUpdated: false,
      artistId: artistId,
    };
    console.log(addPost);
    await Comment.create(addPost);
    return NextResponse.json("팬명록이 등록되었습니다.");
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function GET(
  request: Request,
  context: { params: { artistId: string } }
) {
  const {
    params: { artistId },
  } = context;
  try {
    dbConnect();

    const findComment: CommentData[] = await Comment.find({ artistId });
    if (findComment.length > 0) {
      const res = findComment?.sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
      );
      return NextResponse.json(res);
    }
    return NextResponse.json(findComment);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function PATCH(request: Request) {
  const {
    body: { commentId, content },
  } = await request.json();
  try {
    dbConnect();
    console.log("");
    const updatedAt = getStringDate();
    await Comment.updateOne({ _id: commentId }, [
      {
        $set: { content: content, updatedAt: updatedAt, isUpdated: true },
      },
    ]);

    return NextResponse.json("팬명록을 업데이트 하였습니다.");
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function DELETE(request: NextRequest) {
  const commentId = request.nextUrl.searchParams.get("commentId");
  try {
    dbConnect();
    await Comment.deleteOne({ _id: commentId });

    return NextResponse.json("팬명록을 삭제하였습니다.");
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
