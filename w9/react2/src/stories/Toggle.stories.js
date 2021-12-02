import Toggle from "../components/Toggle";

export default {
  title: "Example/Toggle",
  component: Toggle,
  argTypes: {
    disabled: { control: "boolean", defaultValue: false },
  },
};

export const Default = (args) => {
  return <Toggle {...args}></Toggle>;
};
