export function createStore(reducer) {
    let state;
    const listener = [];
    const publish = () => {
        listener.forEach(({ subscriber, context }) => {
            subscriber.call(context);
        });
    };
    const dispatch = (action) => {
        state = reducer(state, action);
        publish();
    };
    const subscribe = (subscriber, context = null) => {
        listener.push({ subscriber, context });
    };
    const getState = () => ({ ...state });

    return {
        getState,
        dispatch,
        subscribe,
    };
}

export function actionCreator(type, payload = {}) {
    return {
        type,
        payload: { ...payload },
    };
}
