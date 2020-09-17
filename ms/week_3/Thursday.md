## 우아한 테크러닝 React&Typescript 6회차

2020년 09월 17일 목요일

<details><summary>Table of Contents</summary>

-   Webpack [:link:](#webpack)
-   Loader [:link:](#loader)
-   Plugin [:link:](#plugin)
-   React + Typescript 예제 훑어보기 [:link:](#react--typescript-예제-훑어보기)

</details>

### Webpack

`webpack`은 일반적으로 `webpack.config.js`라는 이름을 갖는 설정 파일을 갖는다.<br/>
`webpack`은 `node`에서 실행되며 작성한 **설정 값을 담은 객체**을 읽어 처리하게 된다.<br/>

```javascript
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
```

`node`에서 실행되기 때문에 **모듈**을 사용하기 위해서는 위와 같이 `require`를 사용해야한다.<br/>
설정 값을 담은 객체를 생성하기 위해 아래와 같이 `config` 객체를 생성하고 모듈로 내보낸다.<br/>

```javascript
const config = {};

module.exports = config;
```

`webpack` 설정의 `entry`는 `webpack` 실행 시 진입점을 가리키는 파일을 작성하게 된다.<br/>
`core-js`는 **polyfill** 라이브러리이며 하위 브라우저의 문법과 관련 호환성을 위해 사용한다.<br/>

```javascript
const config = {
    // ...
    entry: {
        main: ["core-js", "./src/index.tsx"],
    },
    // ...
};
```

`webpack`은 굉장히 거대하지만 `webpack`이 해주는 일은 그렇게 많지 않다.<br/>
자세한 속성들은 [webpack 공식문서](https://webpack.js.org/concepts/)를 참고하면 좋을 것 같다.<br/>
`React`와 `Typescript`를 사용하기위해 작성한 `webpack` 설정 파일은 [여기](https://github.com/textuel/Woowa_Tech_Learning_React_Typescript/blob/master/ms/week_3/webpack/webpack.config.js)에서 확인할 수 있다.<br/>

### Loader

`webpack`에서 `loader`는 `redux`의 미들웨어와 같은 역할을 한다 생각하면 된다.<br/>
`entry`를 통해 읽어들인 파일은 `loader`로 넘어가게 되며 각각의 `loader`의 역할을 수행한다.<br/>
`loader`는 설정 파일의 `module` 속성에 작성되며 `rules` 배열에 아래와 같이 기술된다.<br/>

```javascript
const config = {
    // ...
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                include: path.resolve("src"),
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "./images/",
                },
            },
        ],
    },
    // ...
};
```

`Typescript`를 사용하기 위해서는 `ts-loader`같은 `loader`를 사용했지만 현재는 `babel`이 지원한다.<br/>

### Plugin

`Plugin`은 `loader`보다 더 복잡하며 훨씬 더 많은 일을 할 수 있다.<br/>
`plugin`은 `webpack` 설정 객체의 `plugins` 배열에 지정한다.<br/>

```javascript
const config = {
    // ...
    plugins: [
        new webpack.SourceMapDevToolPlugin({}),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    // ...
};
```

보통의 `plugin`은 `loader`가 모두 실행된 후 실행되게 된다.<br/>
`plugin`의 종류는 굉장히 많으며 필요한 기능을 갖는 라이브러리를 설치해 추가하면 된다.<br/>

### React + Typescript 예제 훑어보기

`redux`는 특정 라이브러리에 종속되지 않는 라이브러리다.<br/>

```typescript
import { createStore, applyMiddleware } from "redux";
```

위와 같이 앞에서 구현해 보았던 함수들과 같은 기능을 하는 가져와 사용할 수 있다.<br/>
`redux`를 `React`에서 사용하기 위해서 `react-redux` 라이브러리를 사용해야 한다.<br/>

```tsx
import { Provier } from "react-redux";

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
```

`react-redux`는 `Context API`형식으로 구성된 `Provider`를 제공하며 위와 같이 사용할 수 있다.<br/>
`recuer`에 사용될 초기 상태의 **인터페이스**인 `StoreState`와 `StoreState` 객체는 아래와 같다.<br/>

```typescript
interface StoreState {
    monitoring: boolean;
    success: number;
    failure: number;
}

const initialState: StoreState = {
    monitoring: false,
    success: 0,
    failure: 0,
};
```

`typesafe-actions`라는 라이브러리를 이용해 `action`을 아래와 같이 작성할 수 있다.<br/>

```typescript
import { createAction } from "typesafe-actions";

export const startMonitoring = createAtion(
    "@command/monitoring/start",
    (resolve) => {
        return () => resolve();
    }
);

export const stopMonitoring = createAtion(
    "@command/monitoring/stop",
    (resolve) => {
        return () => resolve();
    }
);

export const fetchSuccess = createAction("@fetch/success", (resolve) => {
    return () => resolve();
});

export const fetchFailure = createAction("@fetch/failure", (resolve) => {
    return () => resolve();
});
```

`typesafe-actions`를 사용하게 되면서 상수를 직접 만들지 않고 액션을 정의할 수 있게 되었다.<br/>

```typescript
import { ActionType, getType } from "typesafe-actions";
import * as Actions from "../actions";

// ...
// 상태 인터페이스 및 상태 선언
// ...

export default (
    state: StoreState = initalState,
    action: ActionType<typeof Actions>
) => {
    switch (aciton.type) {
        case getType(Actions.fetchSuccess):
            return {
                ...state,
                success: state.success + Math.floor(Math.random() * (100 - 1)),
            };

        case getType(Actions.fetchFailure):
            return {
                ...state,
                failure: state.failure + Math.floor(Math.random() * (100 - 1)),
            };
    }
};
```

`reducer`를 작성하기 위해 `getType` 함수를 이용해 가져온 액션의 타입을 가져올 수 있다.<br/>
**비동기 액션**을 처리하기 위해서는 `redux-saga`를 사용하였으며 **제너레이터**를 이용한다.<br/>

```typescript
export default function* () {
    yield fork(monitoringWorkflow);
}
```

`export default`로 내보낸 **제너레이터**는 `redux-saga`의 미들웨어의 `run`메서드에 전달된다.<br/>

```typescript
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
```

`createSagaMiddleware`로 만들어진 `redux-saga`의 미들웨어는 또 `redux`의 미들웨어에 등록되어 사용된다.<br/>

```typescript
import { fork, all, take, race, delay, put } from "redux-saga/effects";
```

`fork(monitoringWorkflow)` `take(monitoringWorkflow)`와 같은 헬퍼함수의 결과는 **객체**다.<br/>
각각의 함수들은 특정 역할을 가지고 있으며 `redux-saga`의 스펙에 맞게 사용하면 된다.<br/>

```typescript
function* monitoringWorkflow() {
    while (true) {
        yield take(getType(Actions.startMonitoring));

        let loop = true;

        while (loop) {
            yield all([
                put({ type: getType(Actions.fetchSuccess) }),
                put({ type: getType(Actions.fetchFailure) }),
            ]);

            const { stoped } = yield race({
                waiting: delay(200),
                stoped: take(getType(Actions.stopMonitoring)),
            });

            if (stoped) {
                loop = false;
            }
        }
    }
}
```

`fork` 함수에 들어간 `monitoringWorkflow` 제너레이터는 위와 같이 작성되어 있다.<br/>
`put` 함수는 액션을 `dispatch`하기위한 함수이며 `all`을 사용해 두 개의 액션을 `dispatch`한다.<br/>
`delay`는 `Promise`와 같이 사용되며 특정 시간을 기다린 후 다시 코드가 실행되게 해준다.<br/>
`race`는 인자 객체의 값중 먼저 응답이 온 값을 반환하는 역할을 한다.<br/>

```typescript
const { stoped } = yield race({
    waiting: delay(200),
    stoped: take(getType(Actions.stopMonitoring)),
});
```

따라서 위 구문의 결과는 200ms동안 기다리거나 `stopMonitoring` 액션이 넘어 오게 된다.<br/>
200ms동안 기다리게 될 경우 `stopped`의 값이 없기 때문에 반복문이 200ms 주기로 계속 실행되게 된다.<br/>
`stopMonitoring` 액션이 넘어오게 될경우 `stoped`값이 넘어와 `loop` 변수가 `false`가 되어 멈추게 된다.<br/>
안쪽 `loop`가 `false`가 되어 멈추게 되면 아래의 구문으로 `startMonitoring` 액션을 기다린다.<br/>

```typescript
while (true) {
    yield take(getType(Actions.startMonitoring));

    let loop = true;
    // ... 200ms를 기다리거나 멈추거나 로직
}
```

`startMonitoring` 액션이 넘어오게 된다면 다시 아래 구문이 실행되며 로직을 반복하게 된다.<br/>
