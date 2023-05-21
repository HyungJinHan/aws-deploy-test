import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";

const CHANGE_INPUT = "waiting/CHANGE_INPUT";
const CREATE = "waiting/CREATE";
const ENTER = "waiting/ENTER";
const LEAVE = "waiting/LEAVE";

// FSA 규칙을 따르는 action 생성 함수 정의

// export const changeInput = (name) => ({ type: CREATE, payload: name });
// export const create = (name) => ({ type: CREATE, payload: name });
// export const enter = (id) => ({ type: ENTER, payload: id });
// export const leave = (id) => ({ type: LEAVE, payload: id });

// createAction 함수
// const functionEx = createAction(TYPE, (payload) => payload);
// 👇 (createAction 사용)

let id = 3;
export const changeInput = createAction(CHANGE_INPUT, (name) => name);
// export const create = createAction(CREATE, (name) => name);
// 👇
export const create = createAction(CREATE, (name) => ({ name, id: id++ }));
// action이 store에 dispatch되기 전에 데이터에 고유 id를 지정해주기 위함
export const enter = createAction(ENTER, (id) => id);
export const leave = createAction(LEAVE, (id) => id);

const initialState = {
  input: "",
  list: [
    { id: 0, name: "홍길동", entered: true },
    { id: 1, name: "엄준식", entered: false },
    { id: 2, name: "한형진", entered: false },
  ],
};

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) =>
      produce(state, (draft) => {
        draft.input = action.payload;
      }),

    [CREATE]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push({
          id: action.payload.id,
          name: action.payload.name,
          entered: false,
        });
      }),

    [ENTER]: (state, action) =>
      produce(state, (draft) => {
        const item = draft.list.find((item) => item.id === action.payload);
        item.entered = !item.entered;
      }),

    [LEAVE]: (state, action) =>
      produce(state, (draft) => {
        draft.list.splice(
          draft.list.findIndex((item) => item.id === action.payload),
          1
        );
      }),
  },
  initialState
);
