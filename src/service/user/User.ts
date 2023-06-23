import dbConnect from "@/db/dbConnect";
import User, { UserData } from "@/db/schema/user";
import { ArtistData } from "@/types/_type";
import axios from "axios";

export default class UserService {
  httpClient;
  constructor() {
    this.httpClient = axios.create({
      baseURL: "http://localhost:3000/api/user",
    });
  }
  async postUser(user: UserData) {
    this.httpClient.post("", {
      body: user,
    });
  }

  async postBookmark(email: string, artist: ArtistData) {
    this.httpClient.post("bookmark", {
      body: { email, artist },
    });
  }

  async deleteBookmark(email: string, artist: ArtistData) {
    this.httpClient.patch("bookmark", {
      body: { email, artist },
    });
  }
}
