import React from "react";
import { changeColor } from "../store/modules/counter";
import Palette from "../components/Palette/Palette";
import { connect } from "react-redux";

const PaletteContainer = (props) => {
  // props: {color: 'red', changeColor: ƒ}

  const handleSelect = (color) => {
    const { changeColor } = props;
    changeColor(color);
  };

  const { color } = props;

  return <Palette onSelect={handleSelect} selected={color} />;
};

/** props로 넣어줄 store 상태값 */
const mapStateToProps = (state) => {
  return { color: state.rootReducer.counter.color };
};

/** props로 넣어줄 action 생성 함수 */
const mapDispatchToProps = (dispatch) => {
  return { changeColor: (color) => dispatch(changeColor(color)) };
};

/** 컴포넌트와 Redux store를 연동하기 위해 connect 함수 사용 */
export default connect(mapStateToProps, mapDispatchToProps)(PaletteContainer);
