import CountUp from "react-countup";

type TOverviewCardProps = {
  title?: string;
  value?: number;
  icon?: React.ReactNode;
};

const OverviewCard = ({ icon, title = "Default Title", value = 0 }: TOverviewCardProps) => {
  return (
    <div className="py-4 px-5 bg-white flex items-center justify-between gap-4 rounded-lg shadow-niceShadowSpread">
      <div className="flex-col flex">
        <span className="text-lg font-medium">{title}</span>
        <span className="text-xl font-bold">
          <CountUp
            end={value}
            duration={3}
            decimal=","
          ></CountUp>
        </span>
      </div>
      {icon}
    </div>
  );
};

export default OverviewCard;
