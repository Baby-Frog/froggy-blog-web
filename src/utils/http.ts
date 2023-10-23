import axios, { AxiosError, AxiosInstance, HttpStatusCode, InternalAxiosRequestConfig } from "axios";
import { TAuthResponse } from "src/types/auth-response.types";
import {
  clearAllAuthenticationInfoFromLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  saveAccessTokenToLS,
  saveRefreshTokenToLS,
  saveUserProfileToLS,
} from "./auth";
import { AUTH_ENDPOINTS } from "src/constants/endpoints";
import { toast } from "react-toastify";
import { isExpiredTokenError, isUnauthorizedError } from "./isAxiosError";
import { TErrorApiResponse } from "src/types/response.types";
class Http {
  instance: AxiosInstance;
  private accessToken: string;
  private refreshToken: string;
  private refreshTokenRequest: Promise<string> | null;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.refreshToken = getRefreshTokenFromLS();
    this.refreshTokenRequest = null;
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_LOCAL_API_URL,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
          return config;
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
        if (url === AUTH_ENDPOINTS.LOGIN) {
          const data = response.data as TAuthResponse;
          this.accessToken = data.data.accessToken;
          this.refreshToken = data.data.refreshToken;
          const profile = data.data.profile;
          saveAccessTokenToLS(this.accessToken);
          saveRefreshTokenToLS(this.refreshToken);
          saveUserProfileToLS(profile);
        } else if (url === AUTH_ENDPOINTS.LOGOUT) {
          this.accessToken = "";
          this.refreshToken = "";
          this.refreshTokenRequest = null;
          clearAllAuthenticationInfoFromLS();
        }
        return response;
      },
      async (error: AxiosError) => {
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error?.response?.status as number)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error?.response?.data;
          const message = data?.message || error.message;
          toast.dismiss();
          toast.error(message);
        }
        if (isUnauthorizedError<TErrorApiResponse<{ message: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig);
          const { url } = config;
          // Lỗi 401 có 2 trường hợp
          // TH1: Lỗi 401 do access_token hết hạn => ta sẽ phải refresh token
          if (isExpiredTokenError(error) && url !== AUTH_ENDPOINTS.REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshAccessToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null;
                  }, 10000);
                });
            return this.refreshTokenRequest.then((accessToken) => {
              if (config?.headers) {
                config.headers.Authorization = `Bearer ${accessToken}`;
              }
              return this.instance({
                ...config,
                headers: { ...config.headers, Authorization: `Bearer ${accessToken}` },
              });
            });
          }
          // TH2: Lỗi 401 do refresh_token hết hạn => ta sẽ phải logout
          clearAllAuthenticationInfoFromLS();
          this.accessToken = "";
          this.refreshToken = "";
          toast.dismiss();
          toast.error(error.response?.data.data?.message);
        }
        return Promise.reject(error);
      },
    );
  }
  private async handleRefreshAccessToken() {
    return this.instance
      .post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
        refreshToken: this.refreshToken,
      })
      .then((response) => {
        const { accessToken } = response.data.data;
        saveAccessTokenToLS(accessToken);
        this.accessToken = accessToken;
        return accessToken;
      })
      .catch((error) => {
        clearAllAuthenticationInfoFromLS();
        this.accessToken = "";
        this.refreshToken = "";
        throw error;
      });
  }
}

const http = new Http().instance;

export default http;
