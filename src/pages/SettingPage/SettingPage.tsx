import { useIsPresent } from "framer-motion";
import PageTransition from "src/components/PageTransition";
import Logo from "src/assets/logo-4.png";
type TSettingPageProps = {
  something: string;
};

const SettingPage = () => {
  const isPresent = useIsPresent();
  return (
    <div>
      <div className="">Hello Setting Page</div>
      <img
        src={Logo}
        alt=""
        width={20}
        height={20}
      />
      <PageTransition isPresent={isPresent}></PageTransition>
    </div>
  );
};

export default SettingPage;
