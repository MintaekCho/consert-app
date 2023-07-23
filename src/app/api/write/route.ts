import { getStringDate } from "@/utils/date";
import dbConnect from "@/db/dbConnect";
import Write from "@/db/schema/write";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { body } = await request.json();
  console.log(body);
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
  const totalCount = await Write.find().count();
  const pageCount = Math.ceil(totalCount / 12);
  const startIndex =
    (page === 1 && totalCount - page * size < 1) ||
    (page > 1 && totalCount - page * size < 1)
      ? 0
      : page > 0
      ? totalCount - page * size
      : -1;
  const endIndex =
    totalCount - page * size < 1 ? Math.abs(totalCount - page * size) : size;
  const res = await Write.find().skip(startIndex).limit(endIndex);
  try {
    dbConnect();

    if (res.length > 0) {
      const findWrite = res.sort(
        (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
      );
      return NextResponse.json({ findWrite, pageCount });
    }
    return NextResponse.json(null);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
