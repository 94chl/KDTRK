import styled from "@emotion/styled";
import PropTypes from "prop-types";

const TabItemWrapper = styled.div`
  display: inline-block;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 60px;
  background: ${({ active }) => (active ? "#ddf" : "#eee")};
  cursor: pointer;
`;

const TabItem = ({ title, index, active, ...props }) => {
  return (
    <TabItemWrapper active={active} {...props}>
      <span strong={active}>{title}</span>
    </TabItemWrapper>
  );
};

TabItem.defaultProps = {
  __TYPE: "Tab.Item",
};

TabItem.propTypes = {
  __TYPE: PropTypes.oneOf(["Tab.Item"]),
};

export default TabItem;
