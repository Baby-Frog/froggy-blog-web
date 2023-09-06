import axios, { AxiosInstance } from "axios";
import { TAuthResponse } from "src/types/auth-response.types";
import { clearAllAuthenticationInfoFromLS, saveAccessTokenToLS, saveRefreshTokenToLS } from "./auth";
class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;
  private refreshTokenRequest: Promise<string> | null;
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.LOCAL_API_URL,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.accessToken = "";
    this.refreshToken = "";
    this.refreshTokenRequest = null;
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      },
    );
    this.instance.interceptors.response.use((response) => {
      const { url } = response.config;
      if (url === "/login" || url === "/register") {
        const data = response.data as TAuthResponse;
        const accessToken = data.data.access_token;
        const refreshToken = data.data.refresh_token;
        saveAccessTokenToLS(accessToken);
        saveRefreshTokenToLS(refreshToken);
      } else if (url === "/logout") {
        this.accessToken = "";
        this.refreshToken = "";
        this.refreshTokenRequest = null;
        clearAllAuthenticationInfoFromLS();
      }
      return response;
    });
  }
}

const http = new Http().instance;

export default http;
