import { getDateTime } from "src/utils/formatDate";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex flex-col gap-2 bg-white shadow-niceShadowSpread rounded-md py-3 px-2">
        <div>Date: {getDateTime(label)}</div>
        <div className="flex items-center gap-1">
          <span className="text-sm text-lightGrey">Total stories:</span>
          <span className="text-sm font-medium text-[#45B153]">{payload?.[0]?.value}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm text-lightGrey">Total comments:</span>
          <span className="text-sm font-medium text-[#008AB3]">{payload?.[1]?.value}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm text-lightGrey">Total likes:</span>
          <span className="text-sm font-medium text-[#9999CC]">{payload?.[2]?.value}</span>
        </div>
      </div>
    );
    return null;
  }
};

export default CustomChartTooltip;
