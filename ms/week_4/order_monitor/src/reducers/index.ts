import { ActionType, getType } from "typesafe-actions";
import { StoreState, ITimelineItem } from "../types";
import * as Actions from "../actions";

const initializeState: StoreState = {
  monitoring: false,
  showTimeline: false,
  duration: 200,
  notifications: [],
  success: 0,
  failure: 0,
  successTimeline: [],
  failureTimeline: []
};

export default (
  state: StoreState = initializeState,
  action: ActionType<typeof Actions>
) => {
  switch (action.type) {
    case getType(Actions.startMonitoring):
      return {
        ...state,
        monitoring: true
      };
    case getType(Actions.stopMonitoring):
      return {
        ...state,
        monitoring: false
      };
    case getType(Actions.showOrderTimelineChart):
      return {
        ...state,
        showTimeline: true
      };
    case getType(Actions.hideOrderTimelineChart):
      return {
        ...state,
        showTimeline: false
      };
    case getType(Actions.updateOrderStatus):
      return {
        ...state,
        ...action.payload
      };
    case getType(Actions.updateOrderTimeline):
      const { success, failure } = action.payload;
      return {
        ...state,
        successTimeline: success.map(([time, count]) => ({ time, count })),
        failureTimeline: failure.map(([time, count]) => ({ time, count }))
      };
    case getType(Actions.addNotification):
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            id: Date.now(),
            ...action.payload,
            show: false,
            timestamp: Date.now()
          }
        ]
      };
    case getType(Actions.showedNotification):
      return {
        ...state,
        notifications: state.notifications.map((noti) =>
          noti.id === action.payload.id ? { ...noti, show: true } : noti
        )
      };
    default:
      return Object.assign({}, state);
  }
};
