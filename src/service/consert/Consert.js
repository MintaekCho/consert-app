import axios from "axios";

export default class Consert {
  httpClient;
  constructor() {
    this.httpClient = axios.create({
      baseURL: "http://localhost:3000/api/consert",
    });
  }

  async rank() {
    return this.httpClient.get("rank");
  }

  async procConsert(name) {
    return this.httpClient.get("proceeding", {
      params: { name },
    });
  }
}
