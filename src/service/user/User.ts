import dbConnect from "@/db/dbConnect";
import User, { UserData } from "@/db/schema/user";

export default class UserService {
  async postUser(user: UserData) {
    dbConnect();
    const { email, name, image } = user;
    const addUser = {
      email,
      name,
      profile: image,
      bookmarks: [],
    };
    const query = User.where({ email });
    const findUser = await query.findOne();
    if (findUser) return;
    else {
        User.create(addUser)
        console.log(`회원가입이 완료되었습니다 : ${email}`)
        return true
    };
  }
}
