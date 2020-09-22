import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { StoreState, INotification } from "../types";
import { showedNotification } from "../actions";
import { notification } from "antd";

interface IProps {
  notifications: INotification[];
  showedNotification(id: number): void;
}

const mapStateToProps = (state: StoreState) => {
  return {
    notifications: state.notifications.filter((n) => !n.show)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  showedNotification: (id) => dispatch(showedNotification(id))
});

class Notification extends React.PureComponent<IProps> {
  componentDidUpdate(prevProps) {
    if (prevProps.notifications.length !== this.props.notifications.length) {
      this.props.notifications.forEach((noti) => {
        notification.error({
          message: noti.type,
          description: noti.msg
        });

        this.props.showedNotification(noti.id);
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div />
      </React.Fragment>
    );
  }
}

export const NotificationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification);
