import React from "react";
import Circle from "../components/Circle";

export default {
  title: "Example/Circle",
  component: Circle,
  argTypes: {
    width: { control: "number" },
    height: { control: "number" },
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <Circle {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: "Circle",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Circle",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Circle",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Circle",
};
