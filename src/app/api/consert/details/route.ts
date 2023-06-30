import dbConnect from "@/db/dbConnect";
import Consert from "@/db/schema/consert";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const consertId = request.nextUrl.searchParams.get("consertId");
  console.log(consertId)
  try {
    dbConnect();
    const conserts = Consert;

    const resConsert = await conserts.findOne({ _id: consertId });
    console.log(resConsert);
    return NextResponse.json(resConsert);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
