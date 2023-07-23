import dbConnect from "@/db/dbConnect";
import WriteComment from "@/db/schema/writeComment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    context: { params: { writeId: string } }
  ) {
    const {
      params: { writeId },
    } = context;
  
    try {
      dbConnect();
  
      const res = await WriteComment.find({ writeId }).count();
      return NextResponse.json(res);
    } catch (error) {
      console.error(error);
      NextResponse.json({ message: "Internal server error" });
    }
  }