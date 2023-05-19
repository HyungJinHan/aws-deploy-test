import React from "react";
import WaitingList from "../components/WaitingList/WaitingList";
import { bindActionCreators } from "redux";
import * as waitingActions from "../store/modules/waiting";
import { connect } from "react-redux";

const WaitingListContainer = (props) => {
  const handleChange = (e) => {
    const { WaitingActions } = props;
    WaitingActions.changeInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { WaitingActions, input } = props;
    WaitingActions.create(input);
    WaitingActions.changeInput("");
  };

  const handleEnter = (id) => {
    const { WaitingActions } = props;
    WaitingActions.enter(id);
  };

  const handleLeave = (id) => {
    const { WaitingActions } = props;
    WaitingActions.leave(id);
  };

  const { input, list } = props;

  return (
    <WaitingList
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
});

const mapDispatchToProps = (dispatch) => ({
  WaitingActions: bindActionCreators(waitingActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingListContainer);
