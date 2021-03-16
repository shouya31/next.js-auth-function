import axiosBase from "axios";

const api = axiosBase.create({
  baseURL: "http://localhost:3001",
  responseType: "json",
});

const authorizationHeader = (token: String) => {
  return {
    headers: {
      Authorization: `Authorization ${token}`
    }
  }
};


// 関数：Rails側へ送る際のHTTPリクエスト
export const createUser = async (name: String, token: String) =>
  await api.post('/api/v1/users', {name}, authorizationHeader(token));