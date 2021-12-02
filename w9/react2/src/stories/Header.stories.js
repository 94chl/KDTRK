import Header from "../components/Header";

export default {
  title: "Example/Header",
  component: Header,
  argTypes: {
    level: { control: { type: "range", min: 1, max: 5 } },
    strong: { control: "boolean" },
    underline: { control: "boolean" },
    color: { control: "color" },
  },
};

export const Default = (args) => {
  return <Header {...args}>Header</Header>;
};
