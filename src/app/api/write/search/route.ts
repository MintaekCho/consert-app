import  Write  from '@/db/schema/write';
import dbConnect from "@/db/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page"));
  const size = Number(request.nextUrl.searchParams.get("size"));
  const keyword = request.nextUrl.searchParams.get("keyword");
  console.log(keyword)
  const startIndex = page === 1 ? 0 : page > 1 ? (page - 1) * size : -1;
  try {
    dbConnect();
    const totalCount = await Write
      .find({ title: { $regex: keyword } })
      .count();
    const pageCount = Math.ceil(totalCount / 15);
    const findWrite = await Write
      .find({ title: { $regex: keyword } })
      .skip(startIndex)
      .limit(size);
    return NextResponse.json({ findWrite, pageCount });
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
