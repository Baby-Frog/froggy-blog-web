import { useIsPresent } from "framer-motion";
import PageTransition from "src/components/PageTransition";
const Homepage = () => {
  const isPresent = useIsPresent();
  return (
    <>
      <PageTransition isPresent={isPresent}></PageTransition>
    </>
  );
};

export default Homepage;
