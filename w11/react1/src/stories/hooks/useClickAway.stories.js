import styled from "@emotion/styled";
import { useState } from "react";
import useClickAway from "../../hooks/useClickAway";

export default {
  title: "Hook/useClickAway",
};

const Popover = styled.div`
  width: 100px;
  height: 100px;
  background: orange;
`;

export const Default = () => {
  const [show, setShow] = useState(false);
  const ref = useClickAway((e) => {
    if (!e.target.tagName !== "BUTTON") setShow(false);
  });

  return (
    <div>
      <button onClick={() => setShow(true)}>Click</button>
      <Popover ref={ref} style={{ display: show ? "block" : "none" }}>
        Pop Over
      </Popover>
    </div>
  );
};
