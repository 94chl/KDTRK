import React from "react";
import CardForm from "../components/Login/CardForm";

export default {
  title: "Login/CardForm",
  component: CardForm,
  argTypes: {
    onChange: { action: "onChange" },
  },
};

// const Template = (args) => <CardForm {...args} />;

// export const Primary = Template.bind({});

export const Default = (args) => {
  return <CardForm {...args}>CardForm</CardForm>;
};
