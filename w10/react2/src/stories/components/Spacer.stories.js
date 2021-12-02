import Spacer from "../../components/Spacer";

export default {
  title: "Example/Spacer",
  component: Spacer,
  argTypes: {
    type: { control: "boolean" },
    size: { control: { type: "range", min: 8, max: 64 }, defaultValue: 8 },
  },
};

const Box = ({ block, style }) => {
  return (
    <div
      style={{
        display: block ? "block" : "inline-block",
        width: 100,
        height: 100,
        backgroundColor: "orange",
        ...style,
      }}
    ></div>
  );
};

export const Horizontal = (args) => {
  return (
    <>
      <Spacer {...args} type="horizontal">
        <Box></Box>
        <Box></Box>
        <Box></Box>
      </Spacer>
    </>
  );
};

export const Vertical = (args) => {
  return (
    <>
      <Spacer {...args} type="vertical">
        <Box block></Box>
        <Box block></Box>
        <Box block></Box>
      </Spacer>
    </>
  );
};
