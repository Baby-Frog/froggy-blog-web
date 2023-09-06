// Note: LS stands for Local Storage
export const saveAccessTokenToLS = (access_token: string) => {
  localStorage.setItem("access_token", access_token);
};

export const saveRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem("refresh_token", refresh_token);
};

export const clearAllAuthenticationInfoFromLS = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};
