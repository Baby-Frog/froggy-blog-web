import { useIsPresent } from "framer-motion";
import PageTransition from "src/components/PageTransition";

type TSettingPageProps = {
  something: string;
};

const SettingPage = () => {
  const isPresent = useIsPresent();
  return (
    <div>
      <div className="">Hello Setting Page</div>
      <PageTransition isPresent={isPresent}></PageTransition>
    </div>
  );
};

export default SettingPage;
