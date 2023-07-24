import { getStringDate } from "@/utils/date";
import dbConnect from "@/db/dbConnect";
import Write from "@/db/schema/write";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { body } = await request.json();
  try {
    dbConnect();
    const createAt = getStringDate();
    const addPost = {
      ...body,
      viewCount: 0,
      commentCount: 0,
      createdAt: createAt,
      updatedAt: null,
      isUpdated: false,
    };
    console.log(addPost);
    const res = await Write.create(addPost);
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page"));
  const size = Number(request.nextUrl.searchParams.get("size"));
  const keyword = request.nextUrl.searchParams.get("keyword");

  const totalCount = await Write.find().count();
  const pageCount = Math.ceil(totalCount / 12);
  const startIndex = page === 1 ? 0 : (page - 1) * size;

  try {
    dbConnect();

    const findWrite = await Write.find({ title: { $regex: keyword } })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(size);
    console.log(findWrite);
    return NextResponse.json({ findWrite, pageCount });
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
