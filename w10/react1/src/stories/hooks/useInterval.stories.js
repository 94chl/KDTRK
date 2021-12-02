import { useState } from "react";
import useInterval from "../../hooks/useInterval";

export default {
  title: "Hook/useInterval",
};

export const Default = () => {
  const [array, setArray] = useState([]);
  const clear = useInterval(() => {
    setArray([...array, "Added! "]);
  }, 1000);

  return (
    <>
      <div>useInterval 테스트</div>
      <div>{array}</div>
      <button onClick={clear}>Stop</button>
    </>
  );
};
