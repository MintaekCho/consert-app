import dbConnect from "@/db/dbConnect";
import Consert from "@/db/schema/consert";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");

  try {
    dbConnect();
    const conserts = Consert;

    const date = new Date();
    const year = date.getFullYear().toString();

    const allConserts = await conserts
      .find()
      .or([{ cast: { $regex: name } }, { title: { $regex: name } }])
      if(allConserts.length === 0) return NextResponse.json(allConserts)
    return NextResponse.json(allConserts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
