import useTimeoutFn from "../../hooks/useTimeoutFn";

export default {
  title: "Hook/useTimeoutFn",
};

export const Default = () => {
  const { run, clear } = useTimeoutFn(() => {
    alert("RUN");
  }, 3000);

  return (
    <>
      <div>useTimeoutFn 테스트</div>
      <button onClick={run}>run 3second</button>
      <button onClick={clear}>clear</button>
    </>
  );
};
