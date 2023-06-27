import dbConnect from "@/db/dbConnect";
import User from "@/db/schema/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqUser = await request.json();
  console.log(reqUser);
  const { email, name, image } = reqUser.body;
  const addUser = {
    email,
    name,
    profile: image,
  };
  try {
    dbConnect();
    const query = User.where({ email });
    const findUser = await query.findOne();
    if (findUser) return;
    else {
      User.create(addUser);
      console.log(`회원가입이 완료되었습니다 : ${email}`);
    }
    return NextResponse.json("회원가입이 완료되었습니다.");
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  try {
    dbConnect();
    const user = User;
    const findUser = await user.findOne({ email });
    console.log(findUser, 111);
    if (findUser) return NextResponse.json(findUser);
    else {
      throw new Error("존재하지 않는 회원입니다.");
    }
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
