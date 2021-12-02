import PropTypes from "prop-types";
import React from "react";

const Spacer = ({ children, type = "horizontal", size = 8, ...props }) => {
  const spacerStyle = {
    ...props.style,
    display: type === "vertical" ? "block" : "inline-block",
    verticalAlign: type === "horizontal" ? "middle" : undefined,
  };

  const nodes = React.Children.toArray(children)
    .filter((el) => React.isValidElement(el))
    .map((el, index, els) => {
      return React.cloneElement(el, {
        ...el.props,
        style: {
          ...el.props.style,
          marginRight:
            type === "horizontal" && index !== els.length - 1
              ? size
              : undefined,
          marginBottom:
            type === "vertical" && index !== els.length - 1 ? size : undefined,
        },
      });
    });

  return (
    <>
      <div style={spacerStyle} {...props}>
        {nodes}
      </div>
    </>
  );
};

Spacer.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
  type: PropTypes.bool,
};

export default Spacer;
