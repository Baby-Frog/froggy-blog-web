import { useContext, useEffect } from "react";
import useRouteElement from "./hooks/useRouteElement";
import { AuthContext } from "./contexts/auth.contexts";
import { LocalStorageEventTarget } from "./utils/auth";

function App() {
  const routeElements = useRouteElement();
  const { clearAuthenInfoFromContext } = useContext(AuthContext);
  useEffect(() => {
    LocalStorageEventTarget.addEventListener("clearAuthen", clearAuthenInfoFromContext);
    return () => {
      LocalStorageEventTarget.removeEventListener("clearAuthen", clearAuthenInfoFromContext);
    };
  }, [clearAuthenInfoFromContext]);
  return <>{routeElements}</>;
}

export default App;
