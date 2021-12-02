import {
  createAction,
  createReducer,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { TypeAliasDeclaration } from "typescript";
import { v4 } from "uuid";

export interface Task {
  id: string;
  content: string;
  complete: boolean;
}

// createSlice() : 액션과 리듀서를 하나로 합침

export const tasks = createSlice({
  name: "tasks", // 하나로 합친 모듈의 이름
  initialState: [] as Task[], // 초기값
  reducers: {
    // 리듀서의 이벤트와 액션 정의
    // 리듀서의 액션
    add: {
      // 해당 액션이 디스패치되면 실행하는 리듀서의 이벤트
      reducer: (state: Task[], action: PayloadAction<Task>) => {
        state.push(action.payload);
      },
      // 리듀서가 실행되기 전에 액션 내용 편집
      prepare: (content: string) => ({
        // 반드시 payload를 반환
        payload: {
          id: v4(),
          content,
          complete: false,
        },
      }),
    },
    update: {
      reducer: (state: Task[], action: PayloadAction<Task>) => {
        const index = state.findIndex((task) => task.id === action.payload.id);
        state[index] = action.payload;
      },
      prepare: (id: string, content: string, complete: boolean) => ({
        payload: {
          id,
          content,
          complete,
        },
      }),
    },
    remove: {
      reducer: (state: Task[], action: PayloadAction<Pick<Task, "id">>) => {
        const index = state.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) state.splice(index, 1);
      },
      prepare: (id: string) => ({
        payload: {
          id,
        },
      }),
    },
  },
});

//  위아래 동일

// createAction(액션타입, 액션 정의 방법(함수))
// createReducer([기본값]. { 액션 : ( state, action ) => { state.push }})

// export const addTask = createAction("tasks/add", (content: string) => {
//   return {
//     payload: {
//       id: v4(),
//       content,
//       complete: false,
//     },
//   };
// });

// export const updateTask = createAction(
//   "tasks/update",
//   (id: string, content: string, complete: boolean) => {
//     return {
//       payload: {
//         id,
//         content,
//         complete,
//       },
//     };
//   }
// );

// export const removeTask = createAction("tasks/remove", (id: string) => {
//   return {
//     payload: {
//       id,
//     },
//   };
// });

// export const tasks = createReducer([] as Task[], {
//   [addTask.type]: (state: Task[], action: PayloadAction<Task>) => {
//   immer가 내장 되어있어서, state.push로 상태 업데이트 가능
//     state.push(action.payload);
//   },
//   [updateTask.type]: (state: Task[], action: PayloadAction<Task>) => {
//     const index = state.findIndex((task) => task.id === action.payload.id);
//     state[index] = action.payload;
//   },
//   [removeTask.type]: (
//     state: Task[],
//     action: PayloadAction<Pick<Task, "id">>
//   ) => {
//     const index = state.findIndex((task) => task.id === action.payload.id);
//     if (index !== -1) state.splice(index, 1);
//   },
// });
