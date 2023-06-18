import dbConnect from "@/db/dbConnect";
import Consert from "@/db/schema/consert";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    console.log(process.env.MONGODB_URI);
    dbConnect();
    const conserts = Consert;

    const allConserts = await conserts.find({});
    console.log(allConserts);
    return NextResponse.json(allConserts);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
