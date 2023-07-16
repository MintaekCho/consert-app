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
    displayName: null,
  };
  console.log(addUser);
  try {
    dbConnect();
    await User.create(addUser);
    console.log(`회원가입이 완료되었습니다 : ${email}`);
    return NextResponse.json("회원가입이 완료되었습니다.");
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function PATCH(request: Request) {
  const data = await request.json();
  const { id, displayName } = data.body;
  try {
    dbConnect();
    const isDisplayName = await User.findOne({ displayName: displayName });
    if (isDisplayName) return NextResponse.json("중복된 닉네임입니다.");
    const query = User.where({ _id: id });
    const findUser = await query.findOne();

    await User.updateOne({ _id: id }, [{ $set: { displayName: displayName } }]);
    console.log(`닉네임을 설정하였습니다. : ${displayName}`);
    return NextResponse.json("닉네임을 설정하였습니다.");
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email");
  console.log(email);
  try {
    dbConnect();
    const user = User;
    const findUser = await user.findOne({ email });
    console.log(findUser, 111);
    if (findUser) return NextResponse.json(findUser);
    else {
      return NextResponse.json(findUser);
    }
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
