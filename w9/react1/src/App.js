import { useState, useEffect, useRef, useCallback } from "react";
import Logo from "./components/Logo";
import Paragraph from "./components/paragraph";
import Counter from "./components/Counter";
import Input from "./components/input";
import AutoCounter from "./components/Counter/AutoCounter_ref";
import ShowSum from "./components/ShowSum";
import Box from "./components/Box";
import CheckBox from "./components/CheckBox";
import useToggle from "./hooks/useToggle";
import useHover from "./hooks/useHover";
import "./App.css";

//.balbelrc가 필요하지만, create-react-app에선 적용이 안댐
//1) 프래그마 설정
// /** @jsxImportSource @emotion/react */
//2) yarn add @craco/craco : 설정을 오버라이드 가능
//craco.config.js 필요 + package.json의 scripts 수정 필요

import { css } from "@emotion/react";
import HoverBox from "./components/HoverBox";
import useKeyPress from "./hooks/useKeyPress";

const style = css`
  color: hotpink;
`;

const SomeComponent = ({ children }) => (
  <div css={style}>
    Some hotpink text.
    {children}
  </div>
);

function App() {
  const [totalCount, setTotalCount] = useState(0);

  // 변화 감지
  useEffect(() => {
    console.log(`totalCount is changed: ${totalCount}`);
  }, [totalCount]);

  useEffect(() => {
    console.log("component loaded");

    //전역적인 이벤트 사용
    const handleScroll = () => {
      console.log(`scroll ${window.scrollY}`);
    };
    document.addEventListener("scroll", handleScroll);
    //return 변환 함수는 컴포넌트 제거 시 실행
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  // DOM 직접 접근, 지역변수로 사용, 값이 변경되도 재랜더링x
  const inputRef = useRef();

  // 함수 컴포넌트는 자신의 상태가 변경될 때 리렌더링
  // 부모 컴포넌트로부터 받는 prop이 변경될 때 리렌더링
  // 부모 컴포넌트의 상태가 변경되면 리렌더링
  // 만약 연산속도가 느린 컴포넌트라면?
  const [label, setLabel] = useState("result");

  //useCallback
  const [goldOn, setGoldOn] = useState(false);
  const [silverOn, setSilverOn] = useState(false);
  const [bronzeOn, setBronzeOn] = useState(false);

  const goldChange = useCallback((e) => setGoldOn(e.target.checked), []);
  const silverChange = useCallback((e) => setSilverOn(e.target.checked), []);
  const bronzeChange = useCallback((e) => setBronzeOn(e.target.checked), []);

  const [on, toggle] = useToggle();
  const [hoverRef, isHover] = useHover();

  const keyPressed = useKeyPress("a");

  return (
    <div className="App">
      <header className="App-header">
        <Logo size={100} />
        <Paragraph bgColor="orange">
          Edit <code>src/App.js</code> and save to reload.
        </Paragraph>

        <SomeComponent></SomeComponent>

        <div>
          TotalCount: {totalCount}
          <Counter
            onIncrease={() => setTotalCount(totalCount + 1)}
            onDecrease={() => setTotalCount(totalCount - 1)}
          />
          <Counter
            onIncrease={() => setTotalCount(totalCount + 1)}
            onDecrease={() => setTotalCount(totalCount - 1)}
          />
          <Counter
            onIncrease={() => setTotalCount(totalCount + 1)}
            onDecrease={() => setTotalCount(totalCount - 1)}
          />
        </div>

        <div>
          <Input ref={inputRef}></Input>
          <button onClick={() => inputRef.current.focus()}>Focus</button>
          <AutoCounter></AutoCounter>
        </div>

        <div>
          <button onClick={() => setLabel(label + "!")}>Change Label</button>
          <ShowSum label={label} n={10000}></ShowSum>
          <Box></Box>
          <CheckBox label="gold" on={goldOn} onChange={goldChange}></CheckBox>
          <CheckBox
            label="silver"
            on={silverOn}
            onChange={silverChange}
          ></CheckBox>
          <CheckBox
            label="bronze"
            on={bronzeOn}
            onChange={bronzeChange}
          ></CheckBox>
        </div>

        <div>
          <CheckBox checked={on} onChange={toggle}></CheckBox>
          <button onClick={toggle}>{on ? "True" : "False"}</button>
          <div>{isHover ? "hover" : "mouseout"}</div>
          <HoverBox ref={hoverRef} />
          <div>{keyPressed && "Pressed"}</div>
        </div>

        <div style={{ height: 500 }}></div>
      </header>
    </div>
  );
}

export default App;
