import { useState } from "react";
import useIntervalFn from "../../hooks/useIntervalFn";

export default {
  title: "Hook/useIntervalFn",
};

export const Default = () => {
  const [array, setArray] = useState([]);
  const [run, clear] = useIntervalFn(() => {
    setArray([...array, "Added! "]);
  }, 1000);

  return (
    <>
      <div>useIntervalFn 테스트</div>
      <div>{array}</div>
      <button onClick={run}>Every 1sec</button>
      <button onClick={clear}>Stop</button>
    </>
  );
};
