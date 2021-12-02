import Slider from "../../components/Slider";
import Spacer from "../../components/Spacer";
import Icon from "../../components/Icon";

export default {
  title: "Component/Slider",
  component: Slider,
  argsTypes: {
    defaultValue: { defaultValue: 1, control: "number" },
    min: { defaultValue: 1, control: "number" },
    max: { defaultValue: 100, control: "number" },
    step: { defaultValue: 0.1, control: "number" },
    onChange: { action: "onChange" },
  },
};

export const Default = (args) => {
  return (
    <Spacer>
      <Icon name="volume"></Icon>
      <Slider
        style={{ width: 100, display: "inline-block" }}
        {...args}
      ></Slider>
      <Icon name="volume-2"></Icon>
    </Spacer>
  );
};
