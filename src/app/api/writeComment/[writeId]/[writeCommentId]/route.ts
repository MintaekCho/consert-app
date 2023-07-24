import dbConnect from "@/db/dbConnect";
import Write from "@/db/schema/write";
import WriteComment from "@/db/schema/writeComment";
import { getStringDate } from "@/utils/date";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  context: { params: { writeCommentId: string } }
) {
  const { body } = await request.json();
  const { content } = body;
  const {
    params: { writeCommentId },
  } = context;

  console.log(writeCommentId);

  try {
    dbConnect();
    const updatedAt = getStringDate();

    const res = await WriteComment.updateOne({ _id: writeCommentId }, [
      {
        $set: {
          content: content,
          updatedAt: updatedAt,
          isUpdated: true,
        },
      },
    ]);

    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function DELETE(
  request: Request,
  context: { params: { writeId: string; writeCommentId: string } }
) {
  const {
    params: { writeId, writeCommentId },
  } = context;

  console.log(writeCommentId);

  try {
    dbConnect();
    const res = await WriteComment.deleteOne({ _id: writeCommentId });
    await Write.updateOne(
      { _id: writeId },
      {
        $inc: { commentCount: -1 },
      }
    );
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
