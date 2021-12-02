import Divider from "../../components/Divider";
import Text from "../../components/Text";

export default {
  title: "Component/Divider",
  component: Divider,
  argsTypes: {},
};

export const Horizontal = (args) => {
  return (
    <>
      <Text>위</Text>
      <Divider type="horizontal"></Divider>
      <Text>아래</Text>
    </>
  );
};

export const Vertical = (args) => {
  return (
    <>
      <Text>좌</Text>
      <Divider type="vertical"></Divider>
      <Text>우</Text>
    </>
  );
};
