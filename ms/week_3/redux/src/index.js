import { createStore, applyMiddleware } from "./redux.js";

function reducer(state = { counter: 0 }, action) {
    switch (action.type) {
        case "INC":
            return {
                ...state,
                counter: state.counter + 1,
            };
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
