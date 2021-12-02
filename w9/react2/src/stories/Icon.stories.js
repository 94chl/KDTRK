import Icon from "../components/Icon";

export default {
  title: "example/Icon",
  component: Icon,
  argTypes: {
    name: { defaultValue: "box", control: "text" },
    size: { defaultValue: 50, control: { type: "range", min: 16, max: 80 } },
    strokeWidth: {
      defaultValue: 2,
      control: { type: "range", min: 2, max: 6 },
    },
    rotate: { defaultValue: 0, control: { type: "range", min: 0, max: 360 } },
    color: { defaultValue: "#222", control: "color" },
  },
};

export const Default = (args) => {
  return <Icon {...args}></Icon>;
};
