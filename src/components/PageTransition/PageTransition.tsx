import { motion } from "framer-motion";
type TPageTransitionProps = {
  isPresent: boolean;
};

const PageTransition = ({ isPresent }: TPageTransitionProps) => {
  return (
    <motion.div
      initial={{ scaleX: 1 }}
      animate={{ scaleX: 0, transition: { duration: 0.5, ease: "circOut" } }}
      exit={{ scaleX: 1, transition: { duration: 0.5, ease: "circIn" } }}
      style={{ originX: isPresent ? 0 : 1, zIndex: 999 }}
      className="privacy-screen"
    />
  );
};

export default PageTransition;
