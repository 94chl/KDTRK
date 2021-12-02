import Skeleton from "../../components/Skeleton";

export default {
  title: "Component/Skeleton",
};

export const Box = (args) => {
  return <Skeleton.Box {...args}></Skeleton.Box>;
};
Box.argTypes = {
  width: { defaultValue: 200, control: "number" },
  height: { defaultValue: 100, control: "number" },
};

export const Circle = (args) => {
  return <Skeleton.Circle {...args}></Skeleton.Circle>;
};
Circle.argTypes = {
  size: { defaultValue: 200, control: "number" },
};

export const Paragraph = (args) => {
  return <Skeleton.Paragraph {...args}></Skeleton.Paragraph>;
};
Paragraph.argTypes = {
  line: { defaultValue: 5, control: "number" },
};

export const Sample = () => {
  return (
    <>
      <div style={{ float: "left", marginRight: 16 }}>
        <Skeleton.Circle size={60}></Skeleton.Circle>
      </div>
      <div style={{ float: "left", width: "80%" }}>
        <Skeleton.Paragraph line={4}></Skeleton.Paragraph>
      </div>
      <div style={{ clear: "both" }}></div>
      <div style={{ float: "left", marginRight: 16 }}>
        <Skeleton.Circle size={60}></Skeleton.Circle>
      </div>
      <div style={{ float: "left", width: "80%" }}>
        <Skeleton.Paragraph line={4}></Skeleton.Paragraph>
      </div>
      <div style={{ clear: "both" }}></div>
    </>
  );
};
