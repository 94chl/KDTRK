import styled from "@emotion/styled";
import useKeyPress from "../../hooks/useKeyPress";

export default {
  title: "Hook/useKeyPress",
};

const Box = styled.div`
  width: 100px;
  height: 100px;
  background: gold;
`;

export const Default = () => {
  const pressed = useKeyPress("a");

  return <>{pressed ? "!OAO!" : "press a"}</>;
};
