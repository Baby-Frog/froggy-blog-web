import Logo from "src/assets/logo-4.png";
type TSettingPageProps = {
  something: string;
};

const SettingPage = () => {
  return (
    <div>
      <div className="">Hello Setting Page</div>
      <img
        src={Logo}
        alt=""
        width={20}
        height={20}
      />
    </div>
  );
};

export default SettingPage;
