import { getStringDate } from "@/utils/date";
import dbConnect from "@/db/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import WriteComment from "@/db/schema/writeComment";
import Write from "@/db/schema/write";

export async function POST(
  request: NextRequest,
  context: { params: { writeId: string } }
) {
  const { body } = await request.json();
  const {
    params: { writeId },
  } = context;

  try {
    dbConnect();
    const createAt = getStringDate();
    const addPost = {
      ...body,
      createdAt: createAt,
      updatedAt: null,
      isUpdated: false,
    };
    console.log(addPost);
    const res = await WriteComment.create(addPost);
    await Write.updateOne(
      { _id: writeId },
      {
        $inc: { commentCount: 1 },
      }
    );

    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function GET(
  request: NextRequest,
  context: { params: { writeId: string } }
) {
  const {
    params: { writeId },
  } = context;

  try {
    dbConnect();
    const createAt = getStringDate();

    const res = await WriteComment.find({ writeId });
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
