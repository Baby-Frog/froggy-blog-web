import { motion } from "framer-motion";
type TPageTransitionProps = {
  isPresent: boolean;
};

const PageTransition = ({ isPresent }: TPageTransitionProps) => {
  return (
    <motion.div
      initial={{ scaleX: 1 }}
      animate={{ scaleX: 0, transition: { duration: 0.3, ease: "circOut" } }}
      exit={{ scaleX: 1, transition: { duration: 0.3, ease: "circOut" } }}
      style={{ originX: isPresent ? 0 : 1 }}
      className="privacy-screen"
    />
  );
};

export default PageTransition;
