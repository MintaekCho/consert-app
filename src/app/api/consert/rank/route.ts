import dbConnect from "@/db/dbConnect";
import ConsertRank from "@/db/schema/consertRank";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    dbConnect();
    const consertRanks = ConsertRank;

    const allConsertRanks = await consertRanks.find({}).limit(10);
    return NextResponse.json(allConsertRanks);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
