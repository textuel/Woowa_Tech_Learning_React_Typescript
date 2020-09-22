## 우아한 테크러닝 React&Typescript 7회차

2020년 09월 22일 화요일

<details><summary>Table of Contents</summary>

-   컴포넌트 분할 [:link:](#컴포넌트-분할)
-   모니터링 예제 훑어보기 [:link:](#모니터링-예제-훑어보기)
-   Typescript의 type과 interface [:link:](#typescript의-type과-interface)
-   type과 interface의 차이점 [:link:](#type과-interface의-차이점)
-   제네릭 [:link:](#제네릭)
-   API 통신 [:link:](#api-통신)

</details>

### 컴포넌트 분할

**외부 상태**에 의존적인 컴포넌트와 의존적이지 않은 컴포넌트를 분리한다.<br/>
**외부 상태**는 컴포넌트의 상태와 관련된 **비즈니스 로직**을 의미한다.<br/>

```tsx
export const Maybe: React.FC<IMaybeProps> = ({ test, children }) => (
    <React.Fragment>{test ? children : null}</React.Fragment>
);
```

위와 컴포넌트 `props`만 받아 사용하는 비즈니스 로직이 없는 컴포넌트다.<br/>
위와 같이 상태가 존재하지 않는 컴포넌트는 `components` 폴더에 주로 작성한다.<br/>

```tsx
class OrderStatus extends React.Component<OrderStatusProps> {
    state = {
        errorRate: 0,
    };

    componentDidUpdate(prevProps) {
        if (
            prevProps.success !== this.props.success ||
            prevProps.failure !== this.props.failure
        ) {
            this.setState({
                errorRate:
                    this.props.failure > 0
                        ? Number(
                              (this.props.failure / this.props.success) * 100
                          ).toFixed(2)
                        : 0,
            });
        }
    }

    render() {
        return <MonitorCard>{/* ... 생략 ... */}</MonitorCard>;
    }
}

export const OrderStatusContiner = connect(mapStateToProps)(OrderStatus);
```

위와 같이 상태를 갖거나 전역 상태와 연결되는 컴포넌트는 `containers` 폴더에 주로 작성한다.<br/>
컴포넌트는 어플리케이션의 크기에 따라 분할하며 컴포넌트 분할에 너무 집착할 필요는 없다.<br/>

### 모니터링 예제 훑어보기

아래의 `App` 컴포넌트 또한 일반적인 컨테이너 컴포넌트다.<br/>

```tsx
export default class App extends React.PureComponent {
    render() {
        return (
            <div>
                <NotificationContainer />
                <header>
                    <Typography.Title>React & TS Boilerplate</Typography.Title>
                </header>
                <main>
                    <OrderStatusContiner />
                    <MonitorControllerContainer />
                </main>
            </div>
        );
    }
}
```

`App` 컨테이너 컴포넌트는 3개의 컨테이너 컴포넌트로 이루어져 있다.<br/>
컨테이너 컴포넌트들을 가지고 있는 `containers` 컴포넌트에는 아래의 `index.ts` 파일을 갖는다.<br/>

```typescript
export * from "./OrderStatus";
export * from "./MonitorController";
export * from "./Notification";
```

위처럼 `index.ts` 파일을 구성하게 되면서 컴포넌트 모듈을 편하게 사용하고 관리할 수 있다.<br/>
컴포넌트의 이름은 길어도 자신이 하는 역할을 이름에 잘 담는 것이 중요하다.<br/>
React의 컴포넌트를 작성하면서 Typescript의 스펙을 사용하는 일이 많지않다.<br/>

```typescript
export interface OrderStatusProps {
    showTimeline: boolean;
    success: number;
    failure: number;
    successTimeline: ITimelineItem[];
    failureTimeline: ITimelineItem[];
}

class OrderStatus extends React.Component<OrderStatusProps> {
    // ... 생략
}
```

위와 같이 컴포넌트의 `props`의 타입을 작성한 후 타입을 지정하는 기능을 가장 많이 사용한다.<br/>

### Typescript의 type과 interface

타입을 지정할 때 `type`을 이용한 타입 별칭이나 `interface`를 이용할 수 있다.<br/>

```typescript
type Person = {
    name: string;
    age: number;
    job?: [];
};

interface Human {
    name: string;
    age: number;
    job?: [];
}
```

위와 같은 `type`이나 `interface`는 컴파일 타임에 적용되는 스펙이다.<br/>

-   `type`, `interface`를 트랜스파일한 결과

```javascript
"user strict";

// 타입 관련 내용의 코드는 없음

```

따라서 `type`이나 `interface`를 Javascript로 트랜스파일 하게되면 아무런 코드가 보이지 않는다.<br/>

```typescript
const p: Person = JSON.parse(prompt("객체를 입력해주세요"));
```

위의 코드는 사용자가 어떠한 입력을 할지 예측할 수 없다.<br/>
런타임에서 사용자의 입력에 따라 오류가 발생해 문제가 생길 수 있으므로 오류 처리가 필요하다.<br/>

> (tip) 알아둘 키워드<br/>
>
> -   parsing vs validating<br/>
> -   type predicate<br/>

### type과 interface의 차이점

`type` 키워드로 선언한 타입 별칭은 아래의 **유니온 타입**을 지원한다.<br/>

```typescript
type box = number | string;
let b: box = 1;
b = "box";
```

`interface`는 유니온 타입을 지원하지 못하지만 **상속**을 지원한다.<br/>

```typescript
interface Cat extends Animal {
    // ...
}
```

이 두 특징을 제외하고 대부분의 기능은 비슷하며 통일성 있게 사용하면 된다.<br/>

### 제네릭

**제네릭**은 동적으로 타입을 지정하는 기능이다.<br/>

```typescript
function identity<T>(arg: T): T {
    return arg;
}
```

위의 `identity` 함수는 `T` 타입의 값이 매개변수를 받아 `T` 타입을 반환한다.<br/>

```typescript
let stringOutput = identity<string>("string");
let numberOutput = identity<number>(1);

console.log(stringOutput); // string
console.log(numberOutput); // 1
```

Typescript의 **제네릭**은 `type`과 `interface` 동일하게 컴파일 타임에 작동하는 코드다.<br/>
React의 컴포넌트의 **제네릭**은 아래와 같이 구성되어 있다.<br/>

```tsx
React.Component<P, S, SS>
```

`P`는 컴포넌트의 `props`, `S`는 컴포넌트의 `state`, `SS`는 `snapshot`을 의미한다.<br/>

### redux와 컴포넌트 연결

기존의 `react-redux`에서는 컴포넌트와 `redux`를 연결하기 위해 `connect` 함수를 사용했다.<br/>

```tsx
const mapStateToProps = (state: StoreState) => {
    return {
        monitoring: state.monitoring,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onStart: () => {
        dispatch(startMonitoring());
    },
    onStop: () => {
        dispatch(stopMonitoring());
    },
});

export const MonitorControllerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MonitorController);
```

`connect` 함수는 `HoC` 형태로 작성되어 있으며 2개의 인자를 받는다.<br/>
첫 번째 인자는 `mapStateToProps`이며 두 번째 인자는 `mapDispatchToProps`를 받는다.<br/>
`mapStateToProps`는 `store`에 존재하는 상태에서 필요한 데이터를 `props`로 전달 받는 함수다.<br/>
`mapDispatchToProps`는 `dispatch`할 액션을 반환해 `props`로 전달 받는 함수다.<br/>
최근에는 `react-redux`또한 함수형 컴포넌트에서 쉽게 사용가능한 Hook을 지원한다.<br/>

```typescript
import { useDispatch, useSelector } from "react-redux";

function MonitorController() {
    const dispatch = useDispatch();
    const monitoring  = useSelector(state = > state.monitoring);

    function onStart() {
        dispatch(startMonitoring());
    }

    function onStop() {
        dispatch(stopMonitoring());
    }

    // ...
}

export default MonitorController;
```

위와 같이 `useDispatch`와 `useSelector`를 이용해 기존의 `connect` 함수를 대체할 수 있다.<br/>

### API 통신

`axios` 패키지를 사용하고 있으며 기본적인 인터페이스 정의는 아래와 같이 되어있다.<br/>

```typescript
interface IApiSuccessMessage {
    status: string;
}

interface IApiError {
    status: string;
    statusCode: number;
    errorMessage: string;
}

export class ApiError implements IApiError {
    status: string = "";
    statusCode: number = 0;
    errorMessage: string = "";

    constructor(err: AxiosError) {
        this.status = err.response.data.status;
        this.statusCode = err.response.status;
        this.errorMessage = err.response.data.errorMessage;
    }
}

interface INumberOfSuccessfulOrderResponse extends IApiSuccessMessage {
    result: {
        success: number;
    };
}

interface INumberOfFailedOrderResponse extends IApiSuccessMessage {
    result: {
        failure: number;
    };
}

interface IOrderTimelineResponse extends IApiSuccessMessage {
    results: {
        successTimeline: [];
        failureTimeline: [];
    };
}
```

API 통신시에 성공과 실패에 관한 반환값 인터페이스를 정의하여 사용하고 있다.<br/>
실제 API 통신을 진행하는 함수는 아래와 같이 `Promise` 형태로 작성되어 있다.<br/>

```typescript
export function fetchNumberOfSuccessfulOrder(): Promise<
    INumberOfSuccessfulOrderResponse
> {
    return new Promise((resolve, reject) => {
        axios
            .get(endpoint.orders.request.success({ error: true }))
            .then((resp: AxiosResponse) => resolve(resp.data))
            .catch((err: AxiosError) => reject(new ApiError(err)));
    });
}

export function fetchNumberOfFailedOrder(): Promise<
    INumberOfFailedOrderResponse
> {
    return new Promise((resolve, reject) => {
        axios
            .get(endpoint.orders.request.failure())
            .then((resp: AxiosResponse) => resolve(resp.data))
            .catch((err: AxiosError) => reject(new ApiError(err)));
    });
}

export function fetchOrderTimeline(
    date: string
): Promise<IOrderTimelineResponse> {
    return new Promise((resolve, reject) => {
        axios
            .get(endpoint.orders.request.timeline(date))
            .then((resp: AxiosResponse) => resolve(resp.data))
            .catch((err: AxiosError) => reject(new ApiError(err)));
    });
}
```

API 요청은 모두 `GET` 메소드를 사용하고 있으며 요청 정보는 다른 파일에서 관리한다.<br/>
요청 정보에 관한 타입은 아래와 같이 `interface`로 정의되어 있다.<br/>

```typescript
interface Config {
    orders: {
        request: {
            success(options: { error?: boolean }): string;
            failure(): string;
            timeline(date: string): string;
        };
    };
}

const config: Config = {
    orders: {
        request: {
            success: ({ error = false }) =>
                `${SERVER}/${API_PREFIX}/orders/request/success${
                    error ? "?error=random" : ""
                }`,
            failure: () => `${SERVER}/${API_PREFIX}/orders/request/failure`,
            timeline: (date) =>
                `${SERVER}/${API_PREFIX}/orders/request/all/${date}`,
        },
    },
};
```

`orders` 객체의 `request` 필드는 `success`, `failue`, `timeline` 함수를 갖는다.<br/>
`success`, `failue`, `timeline` 함수는 API 요청을 보낼 URL을 반환하게 된다.<br/>
