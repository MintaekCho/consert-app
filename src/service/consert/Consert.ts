import axios from "axios";

export default class Consert {
  httpClient;
  constructor() {
    this.httpClient = axios.create({
      baseURL: "/api/consert",
    });
  }

  async getConsertDetails(consertId: string) {
    return this.httpClient.get("details", {
      params: {
        consertId,
      },
    });
  }

  async rank() {
    return this.httpClient.get("rank");
  }

  async procConsert(name: string) {
    return this.httpClient.get("proceeding", {
      params: { name },
    });
  }
}
