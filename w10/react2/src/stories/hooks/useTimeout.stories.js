import useTimeout from "../../hooks/useTimeout";

export default {
  title: "Hook/useTimeout",
};

export const Default = () => {
  const clear = useTimeout(() => {
    alert("RUN");
  }, 3000);

  return (
    <>
      <div>useTimeout 테스트: 3초뒤 alert</div>
      <button onClick={clear}>clear</button>
    </>
  );
};
