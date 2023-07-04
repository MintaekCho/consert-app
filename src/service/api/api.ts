import axios, { AxiosRequestConfig } from "axios";
const API = axios.create({
  baseURL: "/api",
  responseType: "json",
});

export async function postApi<T, D>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
) {
  try {
    const response = await API.post(url, data, { ...config });
    return { isSuccess: true, result: response.data };
  } catch (e) {
    return { isSuccess: false, result: e };
  }
}

export async function getApi<T>(
    url: string,
    config?: AxiosRequestConfig
  ) {
    try {
      const response = await API.get(url, { ...config });
      return { isSuccess: true, result: response.data };
    } catch (e) {
      return { isSuccess: false, result: e };
    }
  }

  export async function deleteApi<T>(
    url: string,
    config?: AxiosRequestConfig
  ) {
    try {
      const response = await API.delete(url, { ...config });
      return { isSuccess: true, result: response.data };
    } catch (e) {
      return { isSuccess: false, result: e };
    }
  }
