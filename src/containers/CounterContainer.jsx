import React from "react";
import Counter from "../components/Couter/Counter";
import { decrement, increment } from "../store/modules/counter";
import { connect } from "react-redux";

const CounterContainer = (props) => {
  // props: {color: 'red', number: 0, increment: ƒ, decrement: ƒ}

  const { color, number, increment, decrement } = props;
  // 비구조화 할당

  const handleIncrement = () => {
    increment();
  };

  const handleDecrement = () => {
    decrement();
  };

  return (
    <Counter
      color={color}
      value={number}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
    />
  );
};

/** props로 넣어줄 store 상태값 */
const mapStateToProps = ({ rootReducer }) => {
  // state를 없애고 비구조화 할당으로 prop을 받음

  return {
    color: rootReducer.counter.color,
    number: rootReducer.counter.number,
  };
};

/** props로 넣어줄 action 생성 함수 */
const mapDispatchToProps = { increment, decrement };
// mapDispatchToProps를 함수 형태가 아닌 아예 액션 생성 함수로 이루어진 객체를 전달하면
// actionCreator: (...params) => dispatch(actionCreator(...params) 매칭을 자동으로 해줌

/** 컴포넌트와 Redux store를 연동하기 위해 connect 함수 사용 */
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);
