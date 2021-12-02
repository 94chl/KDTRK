import Flux from "../../components/Flux";

const { Row, Col } = Flux;

export default {
  title: "Component/Flux",
  component: Flux,
};

const Box = () => {
  return (
    <div
      style={{
        background: "#44b",
        width: "100%",
        height: 30,
        color: "white",
        textAlign: "center",
        borderRadius: 10,
      }}
    >
      Box
    </div>
  );
};

export const Default = (args) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={1}>
        <Box />
      </Col>
      <Col span={2}>
        <Box />
      </Col>
      <Col span={3}>
        <Box />
      </Col>
    </Row>
  );
};

Box.argTypes = {
  width: { defaultValue: 200, control: "number" },
  height: { defaultValue: 100, control: "number" },
};
