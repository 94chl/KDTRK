import { useState, useRef } from "react";

const AutoCounter = () => {
  const [counter, setCounter] = useState(0);
  const intervalId = useRef();

  const handleStart = () => {
    intervalId.current = setInterval(() => {
      setCounter((counter) => counter + 1);
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(intervalId.current);
  };

  return (
    <>
      <div>{counter}</div>
      <button onClick={handleStart}>start</button>
      <button onClick={handleStop}>stop</button>
    </>
  );
};

export default AutoCounter;
