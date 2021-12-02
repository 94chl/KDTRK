import Tab from "../../components/Tab";

export default {
  title: "Component/Tab",
  component: Tab,
};

export const Default = (args) => {
  return (
    <Tab>
      <Tab.Item title="(1) 한국" index="item1">
        한국
      </Tab.Item>
      <Tab.Item title="(2) 중국" index="item2">
        중국
      </Tab.Item>
      <Tab.Item title="(3) 일본" index="item3">
        일본
      </Tab.Item>
    </Tab>
  );
};
