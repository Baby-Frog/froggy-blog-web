import { AnimatePresence } from "framer-motion";
import React, { JSXElementConstructor, ReactElement, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/auth.contexts";
import useRouteElement from "./hooks/useRouteElement";
import { LocalStorageEventTarget } from "./utils/auth";
import Logo from "./assets/logo-4.png";
import AutomaticallyScrollToTop from "./components/AutomaticallyScrollToTop";
function App() {
  const routeElements = useRouteElement();
  const location = useLocation();
  const { clearAuthenInfoFromContext } = useContext(AuthContext);
  useEffect(() => {
    LocalStorageEventTarget.addEventListener("clearAuthen", clearAuthenInfoFromContext);
    return () => {
      LocalStorageEventTarget.removeEventListener("clearAuthen", clearAuthenInfoFromContext);
    };
  }, [clearAuthenInfoFromContext]);
  return (
    <>
      {(import.meta.env.VITE_ENV === "LOCAL" && import.meta.env.VITE_TINY_MCE_API_KEY) ||
      (import.meta.env.VITE_ENV === "PROD" && import.meta.env.VITE_TINY_MCE_API_KEY) ? (
        <AnimatePresence
          mode="wait"
          initial={false}
        >
          {React.cloneElement(routeElements as ReactElement<unknown, string | JSXElementConstructor<unknown>>, {
            key: location.pathname || "/user/profile",
          })}
          <AutomaticallyScrollToTop></AutomaticallyScrollToTop>
        </AnimatePresence>
      ) : (
        <div className="p-2 flex gap-4 items-center flex-col justify-center h-screen text-lg font-medium">
          <div className="flex items-center gap-3 text-[32px] font-bold tracking-[-2px]">
            <img
              src={Logo}
              alt="Froggy Blog"
              className="w-28 h-28"
            />
            <h1>Froggy Blog</h1>
          </div>
          <span className="max-w-[1000px] w-full text-center">
            Dear the person that's running this project, you must config your .env file properly before running this
            project, please follow the .env.example file to config your .env file or paste the .env file that i sent you
            into the root folder.
          </span>
        </div>
      )}
    </>
  );
}

export default App;
