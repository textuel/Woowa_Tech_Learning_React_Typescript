import { createStore } from "./redux";

const INCREMENT = "increment";
const RESET = "reset";

function reducer(state = {}, action) {
    if (action.type === "increment") {
        return { ...state, count: state.count ? state.count + 1 : 1 };
    } else if (action.type === "reset") {
        return {
            ...state,
            count: action.resetCount,
        };
    }

    return state;
}

const store = createStore(reducer);

function update() {
    console.log(store.getState());
}

function actionCreator(type, data) {
    return {
        ...data,
        type: type,
    };
}

function increment() {
    store.dispatch(actionCreator(INCREMENT));
}

function reset(resetCount) {
    store.dispatch(actionCreator(RESET, { resetCount }));
}

store.subscribe(update);

store.dispatch({ type: INCREMENT }); // { count: 1 }
store.dispatch(actionCreator(INCREMENT)); // { count: 2 }

increment(); // { count: 3 }

store.dispatch({ type: RESET, resetCount: 10 }); // { count: 10 }
increment(); // { count: 11 }

store.dispatch(actionCreator(RESET, { resetCount: 5 })); // { count: 5 }
increment(); // { count: 6 }
reset(4); // { count: 4 }
