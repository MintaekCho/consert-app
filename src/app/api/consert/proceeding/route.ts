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
      .and([{ date: { $regex: year } }])
      if(allConserts.length === 0) return NextResponse.json(allConserts)
    const response = allConserts.filter(
      (consert) => new Date(consert.date.split(" ~ ")[1]) >= date
    );
    console.log(allConserts, "1");
    return NextResponse.json(allConserts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
