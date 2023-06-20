import { UserData } from "@/db/schema/user";
import axios from "axios";

export default class User {
    httpClient;
    constructor() {
        this.httpClient = axios.create({
            baseURL: "http://localhost:3000/api/user",
          });
    }

    async postUser(user: UserData) {
       return this.httpClient.post('', {
            body: {
                user: user
            }
       })
    } 
}