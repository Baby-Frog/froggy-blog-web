import axios, { AxiosInstance } from "axios";
class Http {
  instance: AxiosInstance;
  private accessToken: string;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.LOCAL_API_URL,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.accessToken = "";
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          // Bearer
          config.headers.Authorization = `${this.accessToken}`;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      },
    );
  }
}

const http = new Http().instance;

export default http;
