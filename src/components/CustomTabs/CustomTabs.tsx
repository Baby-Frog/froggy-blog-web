import { Tabs } from "antd";
import type { TabsProps } from "antd";

type TTabsProps = {
  items: TabsProps["items"];
};

const CustomTabs = ({ items }: TTabsProps) => {
  return (
    <Tabs
      defaultActiveKey="1"
      items={items}
      color="#242424"
    />
  );
};

export default CustomTabs;
