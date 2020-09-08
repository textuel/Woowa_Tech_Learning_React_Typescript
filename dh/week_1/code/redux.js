export function createStore(reducer) {
  let state;
  const listeners = [];

  const getState = () => {
    return { ...state };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((func) => func());
  };

  const subscribe = (func) => {
    listeners.push(func);
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
}
