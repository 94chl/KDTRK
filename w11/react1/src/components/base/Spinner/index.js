import PropTypes from "prop-types";
import React from "react";
import styled from "@emotion/styled";

const Icon = styled.i`
  display: inline-block;
  vertical-align: middle;
`;

const Spinner = ({
  size = 24,
  color = "#919EAB",
  loading = true,
  ...props
}) => {
  const sizeStyle = {
    width: size,
    height: size,
  };
  return loading ? (
    <Icon>
      <svg
        style={sizeStyle}
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)">
            <path
              d="M36 18c0-9.94-8.06-18-18-18"
              id="Oval-2"
              stroke={color}
              stroke-width="2"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </path>
            <circle fill={color} cx="36" cy="18" r="1">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="0.9s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        </g>
      </svg>
    </Icon>
  ) : null;
};

Spinner.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  loading: PropTypes.bool,
};

export default Spinner;
