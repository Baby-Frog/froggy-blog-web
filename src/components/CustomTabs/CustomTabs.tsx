import { Tabs } from "antd";
import type { TabsProps } from "antd";

type TTabsProps = {
  items: TabsProps["items"];
} & TabsProps;

const CustomTabs = ({ items, ...props }: TTabsProps) => {
  return (
    <Tabs
      defaultActiveKey={props.defaultActiveKey}
      activeKey={props.activeKey}
      onChange={props.onChange}
      items={items}
      color="#242424"
    />
  );
};

export default CustomTabs;
