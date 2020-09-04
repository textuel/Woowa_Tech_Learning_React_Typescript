import { createStore, actionCreator } from "./redux";

const INIT = "init";
const INCREMENT = "increment";
const RESET = "reset";

function reducer(state = {}, { type, payload }) {
    switch (type) {
        case INIT: {
            return {
                ...state,
                count: payload.count,
            };
        }
        case INCREMENT:
            return { ...state, count: state.count ? state.count + 1 : 1 };
        case RESET:
            return {
                ...state,
                count: 0,
            };
        default:
            return { ...state };
    }
}

/* * * * * * * * * * * * * * * * * * * * * * * * * *
 * 헬퍼 함수                                       *
 * init : store의 값을 count로 초기화              *
 * increment : store의 count를 1증가 또는 1로 설정 *
 * reset : store의 count를 0으로 초기화            *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

function init(count) {
    store.dispatch(actionCreator(INIT, { count }));
}

function increment() {
    store.dispatch(actionCreator(INCREMENT));
}

function reset() {
    store.dispatch(actionCreator(RESET));
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 스토어의 생성 및 subscribe를 사용한 state 로깅                    *
 * 1. createStore 함수로 스토어를 생성                               *
 * 2. getState 함수를 사용해 값을 출력하는 함수 작성                 *
 * 3. 스토어의 subscribe 메서드를 이용해 2번에서 작성한 함수로 구독  *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const store = createStore(reducer);

function update() {
    console.log(store.getState());
}

store.subscribe(update);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 스토어의 값을 변경하는 액션을 실행시키는 방법                       *
 * 1. type과 payload을 포함한 액션을 dispatch                          *
 * 2. action을 반환하는 actionCreator 헬퍼 함수를 사용한 후 dispatch   *
 * 3. payload를 전달받아 dispatch까지 해주는 헬퍼 함수 이용            *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

store.dispatch({ type: INCREMENT }); // { count: 1 }
store.dispatch(actionCreator(INCREMENT)); // { count: 2 }
increment(); // { count: 3 }

store.dispatch({ type: INIT, payload: { count: 5 } }); // { count: 5 }
store.dispatch(actionCreator(INIT, { count: 0 })); // { count: 0 }
init(10); // { count: 10 }

store.dispatch({ type: RESET }); // { count: 0 }
store.dispatch(actionCreator(RESET)); // { count: 0 }
reset(0); // { count: 0 }
