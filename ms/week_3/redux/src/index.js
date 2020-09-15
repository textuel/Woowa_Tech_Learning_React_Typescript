import { createStore, applyMiddleware } from "./redux.js";

function api(url, cb) {
    setTimeout(() => {
        cb({ type: "응답", data: [] });
    }, 2000);
}

function reducer(state = { counter: 0 }, action) {
    switch (action.type) {
        case "INC":
            return {
                ...state,
                counter: state.counter + 1,
            };
        case "FETCH_USER":
            api("/api/users/1", (users) => {
                return { ...state, ...users };
            });
        default:
            return { ...state };
    }
}

const logger = (store) => (next) => (action) => {
    console.log("logger:", action.type);
    next(action);
};

const monitor = (store) => (next) => (action) => {
    setTimeout(() => {
        console.log("monitor:", action.type);
        next(action);
    }, 2000);
};

const store = applyMiddleware(createStore(reducer), [logger, monitor]);

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch({ type: "INC" });
