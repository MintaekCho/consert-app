import { getApi } from "@/service/api/api";
export async function usePlaceSearch(place : string ) {
  const API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const URL = `https://dapi.kakao.com/v2/local/search/keyword`;
  const res = getApi(URL, {
    headers: {
      Authorization: `KakaoAK ${API_KEY}`,
    },
    params: {
      query: place,
    },
  });
  return await res
}
