import axios, { AxiosError, AxiosInstance, HttpStatusCode, InternalAxiosRequestConfig } from "axios";
import { TAuthResponse } from "src/types/auth-response.types";
import {
  clearAllAuthenticationInfoFromLS,
  saveAccessTokenToLS,
  saveRefreshTokenToLS,
  saveUserProfileToLS,
} from "./auth";
import { ENDPOINTS } from "src/constants/endpoints";
import { toast } from "react-toastify";
import { isExpiredTokenError, isUnauthorizedError } from "./isAxiosError";
import { TErrorApiResponse } from "src/types/response.types";
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
        } else if (url === `/api${ENDPOINTS.LOGOUT}`) {
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error?.response?.data;
          const message = data?.message || error.message;
          toast.error(message);
        }
        if (isUnauthorizedError<TErrorApiResponse<{ message: string }>>(error)) {
          const config = error.response?.config || ({ headers: {} } as InternalAxiosRequestConfig);
          const { url } = config;
          // Lỗi 401 có 2 trường hợp
          // TH1: Lỗi 401 do access_token hết hạn => ta sẽ phải refresh token
          if (isExpiredTokenError(error) && url !== ENDPOINTS.REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.handleRefreshAccessToken()
              : this.handleRefreshAccessToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null;
                  }, this.TIME_BEFORE_LOOKING_FOR_A_NEW_REFRESH_TOKEN);
                });
            return this.refreshTokenRequest.then((access_token) => {
              if (config?.headers) {
                config.headers.Authorization = access_token;
              }
              // Nghĩa là chúng ta tiếp tục request cũ vừa bị lỗi sau khi refresh thành công, chỉ là thay thế header Authorization bằng token mới
              return this.instance({
                ...config,
                headers: { ...config.headers, Authorization: access_token },
              });
            });
          }
          clearAllAuthenticationInfoFromLS();
          this.accessToken = "";
          this.refreshToken = "";
          toast.error(error.response?.data.data?.message);
        }
        return Promise.reject(error);
      },
    );
  }
  private async handleRefreshAccessToken() {
    return this.instance
      .post(ENDPOINTS.REFRESH_TOKEN)
      .then((response) => {
        const { access_token } = response.data.data;
        saveAccessTokenToLS(access_token);
        this.accessToken = access_token;
        return access_token;
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
