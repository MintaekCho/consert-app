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

  async getUser(email: string) {
    return this.httpClient.get("", {
      params: {email},
    });
  }

  async patchBookmark(email: string, artist: ArtistData) {
    const requestBody = {
      email,
      artist,
    };
    this.httpClient.patch("bookmark", {
      body: requestBody,
    });
  }
}
