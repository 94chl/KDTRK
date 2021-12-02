import styled from "@emotion/styled";
import useScroll from "../../hooks/useScroll";

export default {
  title: "Hook/useScroll",
};

const Box = styled.div`
  width: 100px;
  height: 100px;
  background: orange;
  overflow: auto;
`;

const Inner = styled.div`
  width: 10000px;
  height: 10000px;
  background-image: linear-gradient(180deg, #000 0%, #fff 100%);
`;

export const Default = () => {
  const [ref, coord] = useScroll();

  return (
    <>
      <Box ref={ref}>
        <Inner></Inner>
      </Box>
      <button
        onClick={() => {
          ref.current.scrollTo({ top: 20000, left: 20000, behavior: "smooth" });
        }}
      >
        Scroll
      </button>
      <br />
      x: {coord.x}
      <br />
      y: {coord.y}
    </>
  );
};
