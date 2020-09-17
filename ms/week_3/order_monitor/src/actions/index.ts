import { createAction } from "typesafe-actions";

export const startMonitoring = createAction(
  "@command/monitoring/start",
  resolve => {
    return () => resolve();
  }
);

export const stopMonitoring = createAction(
  "@command/monitoring/stop",
  resolve => {
    return () => resolve();
  }
);

export const fetchSuccess = createAction("@fetch/success", resolve => {
  return () => resolve();
});

export const fetchFailure = createAction("@fetch/failure", resolve => {
  return () => resolve();
});
