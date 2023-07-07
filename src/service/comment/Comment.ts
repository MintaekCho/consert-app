import { SessionUser } from "./../../types/_type";
import axios from "axios";

export default class CommentService {
  httpClient;
  constructor() {
    this.httpClient = axios.create({
      baseURL: "/api/comment",
    });
  }
  async postComment(
    comment: { content: string | undefined; writer: SessionUser },
    artistId: string
  ) {
    return this.httpClient.post(artistId, {
      body: comment,
    });
  }

  async getComments(artistId: string) {
    return this.httpClient.get(artistId, {});
  }

  async patchComment(
    artistId: string,
    comment: { commentId: string; content: string }
  ) {
    return this.httpClient.patch(artistId, {
      body: comment,
    });
  }

  async deleteComment(commentId: string, artistId: string) {
    return this.httpClient.delete(artistId, {
      params: { commentId: commentId },
    });
  }
}
