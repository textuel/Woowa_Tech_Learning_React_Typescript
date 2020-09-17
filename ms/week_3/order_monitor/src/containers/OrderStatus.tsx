import * as React from "react";
import { connect } from "react-redux";
import { StoreState } from "../types";
import { Counter, MonitorCard } from "../components";

export interface OrderStatusProps {
  success: number;
  failure: number;
}

const mapStateToProps = (state: StoreState) => {
  return {
    success: state.success,
    failure: state.failure
  };
};

class OrderStatus extends React.Component<OrderStatusProps> {
  state = {
    errorRate: 0
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.success !== this.props.success ||
      prevProps.failure !== this.props.failure
    ) {
      this.setState({
        errorRate:
          this.props.failure > 0
            ? Number((this.props.failure / this.props.success) * 100).toFixed(2)
            : 0
      });
    }
  }

  render() {
    return (
      <MonitorCard>
        <Counter title="Success" count={this.props.success} />
        <Counter title="Failure" count={this.props.failure} color="red" />
        <Counter title="Error Rate" count={this.state.errorRate} unit="%" />
      </MonitorCard>
    );
  }
}

export const OrderStatusContiner = connect(mapStateToProps)(OrderStatus);
