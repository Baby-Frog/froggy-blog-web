import { TUserProfile } from "src/types/user.types";

export const LocalStorageEventTarget = new EventTarget();

// Note: LS stands for Local Storage
export const getAccessTokenFromLS = () => {
  return localStorage.getItem("accessToken") || "";
};

export const getRefreshTokenFromLS = () => {
  return localStorage.getItem("refreshToken") || "";
};

export const getUserProfileFromLS = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const saveAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken);
};

export const saveRefreshTokenToLS = (refreshToken: string) => {
  localStorage.setItem("refreshToken", refreshToken);
};

export const saveUserProfileToLS = (user: TUserProfile) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const clearAllAuthenticationInfoFromLS = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
  const clearAuthenInfoEvent = new Event("clearAuthen");
  LocalStorageEventTarget.dispatchEvent(clearAuthenInfoEvent);
};
