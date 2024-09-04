import axios from "axios";

const DOMAIN: string = "https://movieapi.cyberlearn.vn/api";
export const ACCESS_TOKEN: string = "accessToken";
export const ROLE: string = "role";

export const http = axios.create({
  baseURL: DOMAIN,
  timeout: 30000,
});

export const httpForNextServer = axios.create({
  timeout: 30000,
});

http.interceptors.request.use(
  (config: any) => {
    // Cấu hình các headers cho yêu cầu gửi đi
    config.headers = {
      ...config.headers,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    // Xử lý phản hồi trả về
    return response;
  },
  (error) => {
    // Xử lý lỗi khi nhận phản hồi
    /*
      if (error.response?.status === 400 || error.response?.status === 404) {
        alert(error.response.message)
      }
       */
    if (error.response?.status === 401 || error.response?.status === 403) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default http;
