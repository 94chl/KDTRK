import React from "react";
import Counter from "../../components/Counter";

export default {
  title: "Example/Counter",
  component: Counter,
  argsTypes: { onIncrease: { action: "click to increase Counter" } },
};

const Template = (args) => <Counter {...args} />;

export const Primary = Template.bind({});
