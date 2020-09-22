import { createAction } from "typesafe-actions";
import { ITimelineItem } from "../types";

export const addNotification = createAction("@notification/add", (resolve) => {
  return (type: string, msg: string) => resolve({ type, msg });
});

export const showedNotification = createAction(
  "@notification/showed",
  (resolve) => {
    return (id: number) => resolve({ id });
  }
);

export const showOrderTimelineChart = createAction(
  "@command/timeline/chart/show",
  (resolve) => {
    return () => resolve();
  }
);

export const hideOrderTimelineChart = createAction(
  "@command/timeline/chart/hide",
  (resolve) => {
    return () => resolve();
  }
);

export const startMonitoring = createAction(
  "@command/monitoring/start",
  (resolve) => {
    return () => resolve();
  }
);

export const stopMonitoring = createAction(
  "@command/monitoring/stop",
  (resolve) => {
    return () => resolve();
  }
);

export const updateOrderStatus = createAction(
  "@update/order/status",
  (resolve) => {
    return (success: number, failure: number) => resolve({ success, failure });
  }
);

export const fetchOrderTimeline = createAction(
  "@fetch/order/timeline",
  (resolve) => {
    return (date: string) => resolve(date);
  }
);

export const updateOrderTimeline = createAction(
  "@udpate/order/timeline",
  (resolve) => {
    return (success: ITimelineItem[], failure: ITimelineItem[]) =>
      resolve({ success, failure });
  }
);
