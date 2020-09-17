import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { StoreState } from "../types";
import { startMonitoring, stopMonitoring } from "../actions";
import { PlayButton } from "../components";

export interface MonitorControllerProps {
  monitoring: boolean;
  onStart(): void;
  onStop(): void;
}

const mapStateToProps = (state: StoreState) => {
  return {
    monitoring: state.monitoring
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onStart: () => {
    dispatch(startMonitoring());
  },
  onStop: () => {
    dispatch(stopMonitoring());
  }
});

class MonitorController extends React.PureComponent<MonitorControllerProps> {
  render() {
    return (
      <div>
        <PlayButton
          monitoring={this.props.monitoring}
          onPlay={this.props.onStart}
          onPause={this.props.onStop}
        />
      </div>
    );
  }
}

export const MonitorControllerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MonitorController);
