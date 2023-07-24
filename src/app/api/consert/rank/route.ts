import dbConnect from "@/db/dbConnect";
import Consert from "@/db/schema/consert";
import { getKorDate, getStringSelectDate } from "@/utils/date";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const date = getStringSelectDate(getKorDate());
  console.log(date)
  try {
    dbConnect();
    const conserts = Consert;

    const allConsertRanks = await conserts
      .find({ startDate: { $gte: date } })
      .sort({ like: -1 })
      .limit(10);
    return NextResponse.json(allConsertRanks);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
