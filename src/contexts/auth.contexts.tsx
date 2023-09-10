import { createContext, useState } from "react";
import { TUser } from "src/types/user.types";

type TInitialAuthContext = {
  isAuthenticated: boolean;
  userProfile: TUser | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setUserProfile: React.Dispatch<React.SetStateAction<TUser | null>>;
};

const initialAuthContext: TInitialAuthContext = {
  isAuthenticated: false,
  userProfile: null,
  setIsAuthenticated: () => null,
  setUserProfile: () => null,
};

export const AuthContext = createContext(initialAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAuthContext.isAuthenticated);
  const [userProfile, setUserProfile] = useState<TUser | null>(initialAuthContext.userProfile);
  return (
    <AuthContext.Provider value={{ isAuthenticated, userProfile, setIsAuthenticated, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
