import dbConnect from "@/db/dbConnect";
import Consert from "@/db/schema/consert";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");

  try {
    dbConnect();
    const conserts = Consert;

    const allConserts = await conserts.find({
      $or: [
        { startDate: { $lte: date }, endDate: { $gte: date } },
        { startDate: { $gte: date }, endDate: { $lte: date } }
      ],
    });
    return NextResponse.json(allConserts);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
