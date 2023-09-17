import { TUserProfile } from "src/types/user.types";

export const LocalStorageEventTarget = new EventTarget();

// Note: LS stands for Local Storage
export const getAccessTokenFromLS = () => {
  return localStorage.getItem("access_token");
};

export const getRefreshTokenFromLS = () => {
  return localStorage.getItem("refresh_token");
};

export const getUserProfileFromLS = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem("access_token", access_token);
};

export const saveRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem("refresh_token", refresh_token);
};

export const saveUserProfileToLS = (user: TUserProfile) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearAllAuthenticationInfoFromLS = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  const clearAuthenInfoEvent = new Event("clearAuthen");
  LocalStorageEventTarget.dispatchEvent(clearAuthenInfoEvent);
};
