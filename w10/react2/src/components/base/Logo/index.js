import PropTypes from "prop-types";
import logo from "./logo.svg";

function Logo(props) {
  return (
    <img
      src={logo}
      className="App-logo"
      alt="logo"
      style={{ width: props.size, height: props.size }}
    />
  );
}

Logo.defaultProps = {
  size: 200,
};

Logo.propTypes = {
  size: PropTypes.number,
};

export default Logo;
