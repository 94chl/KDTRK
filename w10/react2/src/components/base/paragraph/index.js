import PropTypes from "prop-types";
import "./Paragraph.css";

function Paragraph({ children, size = 16, bgColor }) {
  return (
    <p
      className="paragraph"
      style={{ fontSize: size, backgroundColor: bgColor }}
    >
      {children}
    </p>
  );
}

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
};

// import styled from "@emotion/styled";

// const Paragraph = styled.div`
//   background-color: royalblue;
// `;

export default Paragraph;
