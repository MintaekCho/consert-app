import axios from "axios";

export default class Artist {
    httpClient;
    constructor() {
        this.httpClient = axios.create({
            baseURL: "http://localhost:3000/api/artist",
          });
    }

    async getArtist(page: number, size: number) {
       return this.httpClient.get('', {
        params: {
            page: page,
            size: size
        }
       })
    }

    // 아티스트 한명 가져오기
    async getArtistInfo(search: string) {
       return this.httpClient.get(`${search}`)
    }
    
}