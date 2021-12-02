import React from "react";
import Input from "../components/Login/Input";

export default {
  title: "Login/Input",
  component: Input,
  argTypes: {
    onChange: { action: "onChange" },
  },
};

// const Template = (args) => <Input {...args} />;

// export const Primary = Template.bind({});

export const Default = (args) => {
  return <Input {...args}></Input>;
};
