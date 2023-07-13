import dbConnect from "@/db/dbConnect";
import Consert from "@/db/schema/consert";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    dbConnect();
    const conserts = Consert;

    const allConsertRanks = await conserts.find().sort({'like' : -1}).limit(10);
    return NextResponse.json(allConsertRanks);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
