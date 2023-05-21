import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import WaitingList from "../components/WaitingList/WaitingList";
import * as waitingActions from "../store/modules/waiting";

const WaitingListContainer = (props) => {
  const { WaitingActions, input, list, color } = props;
  const { changeInput, create, enter, leave } = WaitingActions;

  const handleChange = (e) => {
    changeInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    create(input);
    changeInput("");
  };

  const handleEnter = (id) => {
    enter(id);
  };

  const handleLeave = (id) => {
    leave(id);
  };

  return (
    <WaitingList
      color={color}
      input={input}
      waitingList={list}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onEnter={handleEnter}
      onLeave={handleLeave}
    />
  );
};

const mapStateToProps = ({ rootReducer }) => ({
  input: rootReducer.waiting.input,
  list: rootReducer.waiting.list,
  color: rootReducer.counter.color,
});

const mapDispatchToProps = (dispatch) => ({
  WaitingActions: bindActionCreators(waitingActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingListContainer);
