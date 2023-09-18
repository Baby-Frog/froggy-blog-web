import { useEffect, useState } from "react";
import LoadingGIF from "src/assets/loading.gif";
import Logo from "src/assets/logo-4.png";
type TLoadingPageProps = {
  children?: React.ReactNode;
};

const LoadingPage = ({ children }: TLoadingPageProps) => {
  const [dotAnimation, setDotAnimation] = useState<string>(".");
  useEffect(() => {
    const interval = setInterval(() => {
      setDotAnimation((prev) => {
        if (prev.length === 3) return ".";
        return prev + ".";
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-screen v-screen bg-white">
      <div className="fixed top-4 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-x-2">
          <img
            src={Logo}
            alt="Logo"
            className="w-[50px] h-[50px]"
          />
          <h2 className="text-[32px] tracking-[-2px] font-bold">Froggy Blog</h2>
        </div>
      </div>
      <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="flex flex-col gap-3 items-center justify-center">
          <img
            src={LoadingGIF}
            alt=""
            width={380}
            height={380}
          />
          <div className="text-lg flex items-center">
            {children}
            <span className="w-[25px]">{dotAnimation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
