import axios, { AxiosError, AxiosInstance, HttpStatusCode } from "axios";
import { TAuthResponse } from "src/types/auth-response.types";
import {
  clearAllAuthenticationInfoFromLS,
  saveAccessTokenToLS,
  saveRefreshTokenToLS,
  saveUserProfileToLS,
} from "./auth";
import { ENDPOINTS } from "src/constants/endpoints";
import { toast } from "react-toastify";
class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;
  private refreshTokenRequest: Promise<string> | null;
  private TIME_BEFORE_LOOKING_FOR_A_NEW_REFRESH_TOKEN: number;
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_LOCAL_API_URL,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.accessToken = "";
    this.refreshToken = "";
    this.refreshTokenRequest = null;
    this.TIME_BEFORE_LOOKING_FOR_A_NEW_REFRESH_TOKEN = 10000;
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
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === ENDPOINTS.LOGIN) {
          const data = response.data as TAuthResponse;
          const accessToken = data.data.accessToken;
          const refreshToken = data.data.refreshToken;
          const user = data.data.profile;
          saveAccessTokenToLS(accessToken);
          saveRefreshTokenToLS(refreshToken);
          saveUserProfileToLS(user);
        } else if (url === ENDPOINTS.LOGOUT) {
          this.accessToken = "";
          this.refreshToken = "";
          this.refreshTokenRequest = null;
          clearAllAuthenticationInfoFromLS();
        }
        return response;
      },
      (error: AxiosError) => {
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error?.response?.status as number)
        ) {
          if (error.config?.url !== ENDPOINTS.LOGIN) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: any | undefined = error?.response?.data;
            const message = data?.message || error.message;
            toast.error(message);
          }
        }
        return Promise.reject(error);
      },
    );
  }
  private handleRefreshAccessToken() {
    return this.instance
      .post(ENDPOINTS.REFRESH_TOKEN)
      .then((response) => {
        const { access_token } = response.data.data;
        saveAccessTokenToLS(access_token);
        this.accessToken = access_token;
      })
      .catch((error) => {
        clearAllAuthenticationInfoFromLS();
        this.accessToken = "";
        this.refreshToken = "";
        console.error(error);
        return Promise.reject(error);
      });
  }
}

const http = new Http().instance;

export default http;
