import React from "react";
import Button from "../../components/Login/Button";

export default {
  title: "Login/Button",
  component: Button,
  argTypes: {
    onClcik: { action: "onClcik" },
  },
};

// const Template = (args) => <Button {...args} />;

// export const Primary = Template.bind({});

export const Default = (args) => {
  return <Button {...args}>Button</Button>;
};
