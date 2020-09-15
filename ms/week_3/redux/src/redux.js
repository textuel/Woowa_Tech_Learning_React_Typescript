export function createStore(reducer) {
    let store;
    const listener = [];
    const publish = () => {
        listener.forEach(({ subscriber, context }) => {
            subscriber.call(context);
        });
    };
    const dispatch = (action) => {
        store = reducer(store, action);
        publish();
    };
    const subscribe = (subscriber, context = null) => {
        listener.push({ subscriber, context });
    };
    const getState = () => ({ ...store });

    return {
        getState,
        dispatch,
        subscribe,
    };
}

export function applyMiddleware(store, middlewares = []) {
    middlewares = middlewares.slice();
    middlewares.reverse();

    let dispatch = store.dispatch;
    middlewares.forEach(
        (middleware) => (dispatch = middleware(store)(dispatch))
    );

    return Object.assign({}, store, { dispatch });
}

export function actionCreator(type, payload = {}) {
    return {
        type,
        payload: { ...payload },
    };
}
