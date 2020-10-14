## 우아한 테크러닝 React&Typescript 8회차

2020년 09월 24일 목요일

<details><summary>Table of Contents</summary>

- MobX [:link:](#mobx)
- observable 클래스와 데코레이터 [:link:](#observable-클래스와-데코레이터)
- 클래스 메서드와 this [:link:](#클래스-메서드와-this)
- observable에 반응하는 함수 [:link:](#observable에-반응하는-함수)

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
    <div classNamep='App'>
      <h1>외부 데이터: {props.data}</h1>
    </div>
  );
}
```

작성한 `App` 컴포넌트는 `index.tsx`에서 아래와 같이 사용될 것이다.<br/>

```tsx
const rootElement = document.getElementById('root');

render(<App data={1} />, rootElement);
```

`Redux`와 달리 `MobX`는 한번에 여러개의 상태를 관리하는 `store`를 만들 수 있다.<br/>
`MobX`에서는 관찰해 관리할 수 있도록 돕는 `observable` 함수를 제공한다.<br/>

```tsx
import { observable } from 'mobx';

const cart = observable({
  data: 1,
});

const rootElement = document.getElementById('root');
render(<App data={cart.data} />, rootElement);
```

`MobX`에서는 `Redux` 스토어의 `subscribe`와 비슷한 기능을 하는 `autorun` 함수를 제공한다.<br/>

```tsx
import { observable, autorun } from 'mobx';

const cart = observable({
  data: 1,
});

autorun(() => {
  console.log(`in autorun => ${cart.data}`);
});

const rootElement = document.getElementById('root');
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
    <div classNamep='App'>
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
import { observable, autorun } from 'mobx';

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

`observable.box`로 만들어진 `weight`는 객체가 되며 `getter`와 `setter`를 갖는다.<br/>
`weight`의 기존값을 기반으로 값변경시키기 위해서는 `get`, `set` 메서드를 사용할 수 있다.<br/>

```tsx
setInterval(() => {
  cart.data++;
  cart.counter += 2;
  weight.set(weight.get() - 1);
}, 1000);
```

위와 같이 값이 변경될 경우 `autorun` 내부에 로깅을 진행할 경우 3개의 값이 바뀌어 3번의 로그가 찍힌다.<br/>
이러한 상황을 방지하게 위해서는 `MobX`가 제공하는 `action` 함수를 이용할 수 있다.<br/>

```tsx
import { action } from 'mobx';

const myAction = action(() => {
  cart.data++;
  cart.counter += 2;
  weight.set(weight.get() - 1);
});

setInterval(() => {
  myAction();
}, 1000);
```

결론적으로 `MobX`가 제공하는 `action` 함수는 작업단위를 묶어주는 역할을 한다.<br/>

### observable 클래스와 데코레이터

작성한 `cart` 객체를 `action` 기능과 묶어 아래와 같이 클래스로도 작성해볼 수 있다.<br/>

```tsx
class Cart {
  data: number = 1;
  cunter: number = 1;

  myAction = action(() => {
    this.data++;
    this.counter += 2;
  });
}

const cart = new Cart();

cart.myAction();
```

하지만 위의 코드로만은 `cart` 인스턴스가 `observable`이 아니기 때문에 `autrun`이 실행되지 않는다.<br/>
`Cart` 클래스를 `observable`로 관리하기 위해서는 **데코레이터** 문법을 사용해야 한다.<br/>
`tsconfig.json`의 `compileOptions`의 `experimentalDecorators` 속성을 변경해주어야 한다.<br/>

```json
{
  "compileOptions": {
    "experimentalDecorators": true
  }
}
```

그 후 아래와 같이 `@observable` 데코레이터를 `Cart` 클래스 위에 붙여주면된다.<br/>

```tsx
@observable
class Cart {
  data: number = 1;
  cunter: number = 1;

  myAction = action(() => {
    this.data++;
    this.counter += 2;
  });
}
```

클래스 자체가 아닌 클래스의 맴버 변수에 `@observable` 데코레이터를 붙일 수도 있다.<br/>

```tsx
class Cart {
  @observable data: number = 1;
  @observable cunter: number = 1;

  myAction = action(() => {
    this.data++;
    this.counter += 2;
  });
}

const cart = new Cart();

setInterval(() => {
  cart.myAction();
}, 3000);
```

위와 같이 `@observable` 데코레이터를 사용하게 되면 값이 정상적으로 바뀌며 리렌더가 된다.<br/>
`observable` 함수와 마찬가지로 `action` 함수도 동일하게 데코레이터로 사용할 수 있다.<br/>

```tsx
class Cart {
  @observable data: number = 1;
  @observable cunter: number = 1;

  @action
  myAction() {
    this.data++;
    this.counter += 2;
  }
}
```

이전과 동일하게 정상적으로 작동하며 ES6 문법에서 사용할 수 있는 **데코레이터는 함수**임을 알 수 있다.<br/>

### 클래스 메서드와 this

클래스의 메소드를 사용할 때는 `this` 객체가 어느것을 가리키는지 확인하는 것이 중요하다.<br/>

```tsx
setInterval(() => {
  cart.myAction.call(null);
}, 3000);
```

위와 같이 `cart` 인스턴스 객체가 아닌 다른곳에 `this` 바인딩이 되어있을 경우 문제가 발생한다.<br/>
`MobX`의 `action` 함수는 이러한 상황을 미연에 방지하기 위해 `action.bound` 기능을 제공한다.<br/>

```tsx
class Cart {
  @observable data: number = 1;
  @observable cunter: number = 1;

  @action.bound
  myAction() {
    this.data++;
    this.counter += 2;
  }

  @action
  myBindedAction = () => {
    this.data++;
    this.counter += 2;
  };
}
```

또는 `action` 데코레이터만 사용하고 클래스 메서드를 **화살표 함수**로 작성하면 된다.<br/>

### observable에 반응하는 함수

`autorun`과 비슷한 기능을 하는 함수는 `when`과 `reaction`이 추가적으로 존재한다.<br/>

#### when

- `when` 함수 사용법

```typescript
when(pedicate: () => boolean, effect?: () => void, options?)
```

- `when` 함수 예시

```tsx
class Resource {
  constructor() {
    when(
      () => !this.isVisible,
      () => this.dispose()
    );
  }

  @computed get isVisible() {}

  dispose() {}
}
```

`when` 함수는 기본적으로 두 개의 함수를 인자로 받는다.<br/>
첫 번째 인자는 `boolean`을 반환하는 함수이며 두번째 함수는 첫 번째 함수가 `true`를 반환할 경우 실행된다.<br/>

#### reaction

- `reaction` 함수 사용법

```typescript
reaction(() => data, (data, reaction) => { sideEffect }, options?)
```

- `reaction` 함수 예시

```tsx
import { reaction } from 'mobx';

const myReaction = reaction(
  () => todos.length,
  (length) =>
    console.log(`myReaction: ${todos.map((todo) => todo.title).join(', ')}`)
);
```

`reaction`은 `useEffect`와 비슷하게 생겼으며 두 개의 함수를 인자로 받는다.<br/>
첫 번째 함수의 반환값은 두번째 함수의 인자로 전달되며 **반환값이 이전과 다를 경우**에만 실행된다.<br/>
