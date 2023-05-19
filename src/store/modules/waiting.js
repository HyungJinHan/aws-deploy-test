import { createAction, handleActions } from "redux-actions";

const CHANGE_INPUT = "waiting/CHANGE_INPUT";
const CREATE = "waiting/CREATE";
const ENTER = "waiting/ENTER";
const LEAVE = "waiting/LEAVE";

// FSA 규칙을 따르는 action 생성 함수 정의

// export const changeInput = (text) => ({ type: CREATE, payload: text });
// export const create = (text) => ({ type: CREATE, payload: text });
// export const enter = (id) => ({ type: ENTER, payload: id });
// export const leave = (id) => ({ type: LEAVE, payload: id });

// createAction 함수
// const functionEx = createAction(TYPE, (payload) => payload);
// 👇 (createAction 사용)

let id = 3;
export const changeInput = createAction(CHANGE_INPUT, (text) => text);
// export const create = createAction(CREATE, (text) => text);
// 👇
export const create = createAction(CREATE, (text) => ({ text, id: id++ }));
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
    [CHANGE_INPUT]: (state, action) => ({
      ...state,
      input: action.payload,
    }),

    [CREATE]: (state, action) => ({
      ...state,
      list: state.list.concat({
        id: action.payload.id,
        name: action.payload.text,
        entered: false,
      }),
    }),

    [ENTER]: (state, action) => ({
      ...state,
      list: state.list.map((item) =>
        item.id === action.payload ? { ...item, entered: !item.entered } : item
      ),
    }),

    [LEAVE]: (state, action) => ({
      ...state,
      list: state.list.filter((item) => item.id !== action.payload),
    }),
  },
  initialState
);
