import React from "react";
import ErrorText from "../components/Login/ErrorText";

export default {
  title: "Login/ErrorText",
  component: ErrorText,
  argTypes: {
    onChange: { action: "onChange" },
  },
};

// const Template = (args) => <ErrorText {...args} />;

// export const Primary = Template.bind({});

export const Default = (args) => {
  return <ErrorText {...args}>Error Text</ErrorText>;
};
