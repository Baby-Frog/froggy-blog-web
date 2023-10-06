import { Tabs } from "antd";
import type { TabsProps } from "antd";

type TTabsProps = {
  items: TabsProps["items"];
};

const CustomTabs = ({ items }: TTabsProps) => {
  const onChange = (key: string) => {
    console.log(key);
  };
  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      color="#000"
      onChange={onChange}
    />
  );
};

export default CustomTabs;
