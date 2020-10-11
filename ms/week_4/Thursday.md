## 우아한 테크러닝 React&Typescript 8회차

2020년 09월 24일 목요일

<details><summary>Table of Contents</summary>

- MobX [:linkL](#mobx)

</details>

### MobX

`MobX`는 `React`에 의존성이 없는 일반적인 자바스크립트 상태관리 라이브러리다.<br/>
`React`와 같이 사용하기 위해서는 `mobx-react` 라이브러리를 같이 사용해야 한다.<br/>
`MobX`를 사용하기 위해 아래와 같이 생성한 `App` 컴포넌트를 수정한다.<br/>

- `App.tsx`

```tsx
interface AppProps {
  data: number;
}

export default function App(props: AppProps) {
  return (
    <div classNamep="App">
      <h1>외부 데이터: {props.data}</h1>
    </div>
  );
}
```

작성한 `App` 컴포넌트는 `index.tsx`에서 아래와 같이 사용될 것이다.<br/>

```tsx
const rootElement = document.getElementById("root");

render(<App data={1} />, rootElement);
```

`Redux`와 달리 `MobX`는 한번에 여러개의 상태를 관리하는 `store`를 만들 수 있다.<br/>
`MobX`에서는 관찰해 관리할 수 있도록 돕는 `observable` 함수를 제공한다.<br/>

```tsx
import { observable } from "mobx";

const cart = observable({
  data: 1,
});

const rootElement = document.getElementById("root");
render(<App data={cart.data} />, rootElement);
```

`MobX`에서는 `Redux` 스토어의 `subscribe`와 비슷한 기능을 하는 `autorun` 함수를 제공한다.<br/>

```tsx
import { observable, autorun } from "mobx";

const cart = observable({
  data: 1,
});

autorun(() => {
  console.log(`in autorun => ${cart.data}`);
});

const rootElement = document.getElementById("root");
render(<App data={cart.data} />, rootElement);

cart.data++;

// in autorun => 1
// in autorun => 2
```

위의 코드에서 `autorun`에 등록된 `console.log`는 두 번 콘솔에 찍히게 된다.<br/>
처음 `observable`에 값이 초기화될 때와 `cart.data++`로 값이 변경될 때이다.<br/>

```tsx
autorun(() => {
  console.log(`in autorun => ${cart.data}`);
  render(<App data={cart.data} />, rootElement);
});

setInterval(() => {
  cart.data++;
}, 1000);
```

위와 같이 `autorun` 함수에 `render`를 넣게되면 변경되는 상태가 컴포넌트에 적용 된다.<br/>
`App` 컴포넌트의 속성에 `number`타입의 `counter` 속성을 아래와 같이 추가한다.<br/>

- `App.tsx`

```tsx
interface AppProps {
  data: number;
  counter: number;
}

export default function App(props: AppProps) {
  return (
    <div classNamep="App">
      <h1>
        외부 데이터: {props.data} vs {props.counter}
      </h1>
    </div>
  );
}
```

마찬가지로 `observable` 함수로 생성된 `cart` 스토어에도 `counter` 속성을 추가해준다.<br/>

- `index.tsx`

```tsx
import { observable, autorun } from "mobx";

const cart = observable({
  data: 1,
  counter: 1,
});

autorun(() => {
  render(<App data={cart.data} counter={cart.counter} />, rootElement);
});

setInterval(() => {
  cart.data++;
  cart.counter += 2;
}, 1000);
```

일반적으로 `observable`로 감쌀 수 있는 것은 객체나 배열과 같은 **객체 타입** 값이다.<br/>
`number`, `string` 같은 원시타입을 감싸주기 위해서는 `observable.box`를 사용해야 한다.<br/>

```tsx
const weight = observable.box(82);
```
