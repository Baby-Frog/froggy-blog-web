import axios, { AxiosError, HttpStatusCode } from "axios";
import { TErrorApiResponse } from "src/types/response.types";

export const isAxiosError = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error);
};

export const isUnprocessableEntityError = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
};

export const isBadRequestError = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest;
};

export const isUnauthorizedError = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;
};

export const isExpiredTokenError = <T>(error: unknown): error is AxiosError<T> => {
  return (
    (isUnauthorizedError<TErrorApiResponse<{ name: string; message: string }>>(error) &&
      error.response?.data?.message === "TOKEN EXPIRED") ||
    (isUnauthorizedError<TErrorApiResponse<{ name: string; message: string }>>(error) &&
      error.response?.data?.message === "TOKEN INVALID")
  );
};
