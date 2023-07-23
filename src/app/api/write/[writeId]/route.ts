import dbConnect from "@/db/dbConnect";
import Write from "@/db/schema/write";
import { getStringDate } from "@/utils/date";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { writeId: string } }
) {
  const {
    params: { writeId },
  } = context;
  console.log(writeId);

  try {
    dbConnect();
    const res = await Write.findOne({ _id: writeId });
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function PATCH(
  request: Request,
  context: { params: { writeId: string } }
) {
  const { body } = await request.json();
  const { title, content } = body;
  const {
    params: { writeId },
  } = context;

  console.log(writeId);

  try {
    dbConnect();
    const updatedAt = getStringDate();

    const res = await Write.updateOne({ _id: writeId }, [
      {
        $set: {
          title: title,
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
  context: { params: { writeId: string } }
) {
  const {
    params: { writeId },
  } = context;

  const session = getSession();
  console.log(111)

  try {
    dbConnect();
    const res = await Write.deleteOne({ _id: writeId });
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

