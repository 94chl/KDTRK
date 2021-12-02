import React from "react";
import SignUpForm from "../components/Login/SignUpForm";

export default {
  title: "Login/SignUpForm",
  component: SignUpForm,
  argTypes: {
    onChange: { action: "onChange" },
  },
};

// const Template = (args) => <SignUpForm {...args} />;

// export const Primary = Template.bind({});

export const Default = (args) => {
  return <SignUpForm {...args}></SignUpForm>;
};
