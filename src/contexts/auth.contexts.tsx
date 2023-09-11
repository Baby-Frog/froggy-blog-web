import { createContext, useState } from "react";
import { TUser } from "src/types/user.types";
import { getAccessTokenFromLS, getRefreshTokenFromLS, getUserProfileFromLS } from "src/utils/auth";

type TInitialAuthContext = {
  isAuthenticated: boolean;
  userProfile: TUser | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserProfile: React.Dispatch<React.SetStateAction<TUser | null>>;
  clearAuthenInfoFromContext: () => void;
};

const initialAuthContext: TInitialAuthContext = {
  isAuthenticated: Boolean(getAccessTokenFromLS() && getRefreshTokenFromLS()),
  userProfile: getUserProfileFromLS() ?? null,
  setIsAuthenticated: () => null,
  setUserProfile: () => null,
  clearAuthenInfoFromContext: () => null,
};

export const AuthContext = createContext(initialAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthContext.isAuthenticated);
  const [userProfile, setUserProfile] = useState<TUser | null>(initialAuthContext.userProfile);
  const clearAuthenInfoFromContext = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
  };
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userProfile, setIsAuthenticated, setUserProfile, clearAuthenInfoFromContext }}
    >
      {children}
    </AuthContext.Provider>
  );
};
