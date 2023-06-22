import dbConnect from "@/db/dbConnect";
import Consert from "@/db/schema/consert";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");
  try {
    console.log(process.env.MONGODB_URI);
    dbConnect();
    const conserts = Consert;

    const date = new Date();
    const today = date.toString().split("T");
    const year = date.getFullYear().toString();

    const allConserts = await conserts
      .find()
      .or([{ cast: { $regex: name } }, { title: { $regex: name } }])
      .and([{ date: { $regex: year } }])
      .or([{ date: { $regex: year + 1 } }]);
      if(allConserts.length === 0) return NextResponse.json(allConserts)
    const response = allConserts.filter(
      (consert) => consert.date.split(" ~ ")[0] >= today
    );
    console.log(response, "1");
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
