import App from "./App.js";
import { getItem, setItem } from "./storage.js";

const initialState = getItem("todos", []);

// local storage가 비었을 경우, 더미 데이터 저장
if (!initialState.length) {
  const dummyData = { text: "dummy list", isCompleted: false };
  setItem("todos", JSON.stringify([dummyData]));
  initialState.push(dummyData);
}

const $app = document.querySelector(".app");

new App({
  $target: $app,
  initialState,
});
