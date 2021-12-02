import React from "react";
import LoginForm from "../../components/Login/LoginForm";

export default {
  title: "Login/LoginForm",
  component: LoginForm,
  argTypes: {
    onSubmit: { action: "onSubmit" },
  },
};

// const Template = (args) => <LoginForm {...args} />;

// export const Primary = Template.bind({});

export const Default = (args) => {
  return <LoginForm {...args}></LoginForm>;
};
