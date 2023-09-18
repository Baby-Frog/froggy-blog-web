import { AnimatePresence } from "framer-motion";
import React, { JSXElementConstructor, ReactElement, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "./contexts/auth.contexts";
import useRouteElement from "./hooks/useRouteElement";
import { LocalStorageEventTarget } from "./utils/auth";

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
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        {React.cloneElement(routeElements as ReactElement<unknown, string | JSXElementConstructor<unknown>>, {
          key: location.pathname || "/user/profile",
        })}
      </AnimatePresence>
    </>
  );
}

export default App;
