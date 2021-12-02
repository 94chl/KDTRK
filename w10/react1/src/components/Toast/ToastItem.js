import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import ReactDOM from "react-dom";
import { v4 } from "uuid";
import Text from "../Text";
import useTimeOut from "../../hooks/useTimeout";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 450px;
  height: 70px;
  padding: 20px;
  align-items: center;
  border-radius: 4px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border: 1px solid #ddd;
  background: #fff;
  box-shadow: 0 1px 30px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  opacity: 1;
  transition: opacity 0.4s ease-out;

  &:first-of-type {
    animation: move 0.4s ease-out forwards;
  }

  &:not(:first-of-type) {
    margin-top: 8px;
  }

  @keyframes move {
    0% {
      margin-top: 80px;
    }
    100% {
      margin-top: 0;
    }
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 4px;
  background: #44b;
  animation-name: progress;
  animation-timing-function: linear;
  animation-fill-mode: forwards;

  @keyframes progress {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;

const ToastItem = ({ id, message, duration, onDone }) => {
  const [show, setShow] = useState(true);

  useTimeOut(() => {
    setShow(false);
    setTimeout(() => onDone(), 400);
  }, duration);

  return (
    <Container style={{ opacity: show ? 1 : 0 }}>
      <ProgressBar style={{ animationDuration: `${duration}ms` }}></ProgressBar>
      <Text>{message}</Text>
    </Container>
  );
};

export default ToastItem;
