import Spinner from "../components/Spinner";

export default {
  title: "Example/Spinner",
  component: Spinner,
  argTypes: {
    color: { control: "string" },
    size: { control: "number", defaultValue: 24 },
  },
  loading: { control: "boolean", default: true },
};

export const Default = (args) => {
  return <Spinner {...args}></Spinner>;
};
