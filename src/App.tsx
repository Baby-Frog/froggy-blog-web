import useRouteElement from "./hooks/useRouteElement";

function App() {
  const routeElements = useRouteElement();
  return <>{routeElements}</>;
}

export default App;
