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
  try {
    dbConnect();
    const query = User.where({ email });
    const findUser = await query.findOne();
    if (findUser) {
      console.log(`${email}님 로그인을 환영합니다`);
      return NextResponse.json(`${email}님 로그인을 환영합니다`);
    } else {
      await User.create(addUser);
      console.log(`회원가입이 완료되었습니다 : ${email}`);
      return NextResponse.json("회원가입이 완료되었습니다.");
    }
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
    const query = User.where({ _id: id });
    const findUser = await query.findOne();
    if (isDisplayName) throw new Error("중복된 닉네임입니다.");
    if (findUser.displayName) {
      throw new Error("이미 닉네임을 설정하였습니다.");
    } else {
      await User.updateOne({ _id: id }, [
        { $set: { displayName: displayName } },
      ]);
      console.log(`닉네임을 설정하였습니다. : ${displayName}`);
      return NextResponse.json("닉네임을 설정하였습니다.");
    }
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
    if (findUser) return NextResponse.json(findUser);
    else {
      throw new Error("존재하지 않는 회원입니다.");
    }
  } catch (error) {
    console.error(error);
    NextResponse.json({ message: "Internal server error" });
  }
}
