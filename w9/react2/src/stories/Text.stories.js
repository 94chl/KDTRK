import React from "react";
import Text from "../components/Text";

export default {
  title: "Example/Text",
  component: Text,
  argTypes: {
    size: { control: "number" },
    strong: { control: "boolean" },
    underline: { control: "boolean" },
    delete: { control: "boolean" },
    color: { control: "color" },
    block: { control: "boolean" },
    paragraph: { control: "boolean" },
    mark: { control: "boolean" },
    code: { control: "boolean" },
  },
};

export const Default = (args) => {
  return <Text {...args}>Text</Text>;
};

export const Size = (args) => {
  return (
    <>
      <Text {...args} size="large">
        Text1
      </Text>
      <Text {...args} size="normal">
        Text2
      </Text>
      <Text {...args} size="small">
        Text3
      </Text>
      <Text {...args} size={36}>
        Custom
      </Text>
    </>
  );
};
