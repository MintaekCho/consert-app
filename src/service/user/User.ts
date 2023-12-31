import { UserData } from "@/types/_type";
import axios from "axios";

export default class UserService {
  httpClient;
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://consert-app.vercel.app/api/user",
      // baseURL: "http://localhost:3000/api/user"
    });
  }
  async postUser(user: UserData) {
    this.httpClient.post("", {
      body: user,
    });
  }

  async getUser(email: string) {
    return this.httpClient.get("", {
      params: { email },
    });
  }
}
