import React from "react";
import Title from "../../components/Login/Title";

export default {
  title: "Login/Title",
  component: Title,
  argTypes: {
    onChange: { action: "onChange" },
  },
};

// const Template = (args) => <Title {...args} />;

// export const Primary = Template.bind({});

export const Default = (args) => {
  return <Title {...args}>Title</Title>;
};
