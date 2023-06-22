import dbConnect from "@/db/dbConnect";
import Consert from "@/db/schema/consert";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const page = Number(request.nextUrl.searchParams.get("page"));
  const size = Number(request.nextUrl.searchParams.get("size"));
  try {
    console.log(process.env.MONGODB_URI);
    dbConnect();
    const conserts = Consert;
    const startIndex = page === 1 ? 0 : page > 1 ? (page - 1) * size : -1;

    const allConserts = await conserts.find().skip(startIndex).limit(size);
    console.log(allConserts);
    return NextResponse.json(allConserts);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
