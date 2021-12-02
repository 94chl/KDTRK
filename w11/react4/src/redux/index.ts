import { applyMiddleware, combineReducers, createStore } from "redux";
import { tasks } from "./tasks";
import logger from "redux-logger";
// import { composeWithDevTools } from "redux-devtools-extension";
// state 로컬스토리지 저장
import { persistReducer, persistStore } from "redux-persist";
import session from "redux-persist/lib/storage/session"; // 세션
import storage from "redux-persist/lib/storage"; // 로컬
import { configureStore } from "@reduxjs/toolkit";

// redux-persist
const persistConfig = {
  key: "root",
  storage: session, // || storage
  whitelist: ["tasks"], // 특정 짓기 , 특정 제외는 blacklist
};

// const combinedReducers = combineReducers({ tasks });
// createSlice 사용 전(위), 사용 후(아래)
const combinedReducers = combineReducers({ tasks: tasks.reducer });

const rootReducer = persistReducer(persistConfig, combinedReducers);

// export const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(logger))
// );

export const store = configureStore({
  reducer: rootReducer,
  middleware: [logger], // 내부에서 미들웨어 설정가능
  devTools: true, // devTools 내장
});

export const persistor = persistStore(store as any);

export type RootState = ReturnType<typeof store.getState>;

//redux-logger
//상태가 변경될때 console.log를 찍어주는 미들웨어 라이브러리

// redux-devtools-extension

// redux-persist
// 상태를 로컬,세션스토리지에 남길 수 있게 하는 미들웨어 라이브러리
