import useKey from "../../hooks/useKey";

export default {
  title: "Hook/useKey",
};

export const Default = () => {
  useKey("keydown", "a", () => {
    alert("A! Down!");
  });

  useKey("keyup", "s", () => {
    alert("S! Up!");
  });

  return <>useKey Hook</>;
};
