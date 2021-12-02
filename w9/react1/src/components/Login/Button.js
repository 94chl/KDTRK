import styled from "@emotion/styled";

const Button = styled.button`
  display: block;
  height: 40px;
  width: 100%;
  border: none;
  outline: none;
  color: white;
  border-radius: 5px;
  padding: 5px;
  background-color: black;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }

  &:active {
    background-color: #999;
  }

  &:disabled {
    background-color: red;
  }
`;

export default Button;
