# 1일차 - 개요와 큰그림

## 배울 내용
### 문제
소프트웨어란? 결국 소프트웨어의 목표는 문제를 해결하는 것임.

문제를 해결하는데 있어 주니어 개발자는 다음 내용들을 고민함
- 어떤 코드가 코드 품질이 좋은 코드인지
- 어떤 아키텍쳐를 사용하는게 좋은지
- 이 문제에 맞는 적정기술을 사용하는지

### 도구
이 고민들을 해결하기 위해선 **도구**를 이해하는게 중요함.

문제를 해결하기 위해서 우리는 도구를 많이 사용하는데, 이 도구들을 잘 활용하기 위해선 그 도구가 해결하고자 하는 미션을 이해하는게 가장 중요함.

1. 결국 이 도구도 또다른 문제를 해결하는데 만들었기 때문에, 이 도구를 만든 사람이 어떻게 이런 문제를 해결했는지 이해하는 것이 중요함. 만든 사람의 생각하는 흐름이 존재하는데, 이 흐름을 벗어나서 이 도구를 사용한다면 사용하기 불편할 가능성이 큼. 따라서 만든 사람의 흐름을 잘 따라가는것이 중요함.
2. 다만, 도구는 도구일 뿐, 사용 관점에서는 또 다른 사용법을 발견해낼수도 있는 것임. 이 도구를 흐름에 벗어나도 얼마나 자유롭게 사용할 수 있을지 활용하는 것도 중요하다.

그렇다면 Best Case(전자) vs 유연성(후자)중 어떤걸 골라야 할까? 이런 것을 생각하면서 하나하나 배워보자.

### 키워드
- 상태 : 앱을 총괄하는 상태 (state)를 어떻게 관리할것인가
- 환경 : 특히나 웹은 다양한 환경에 사용되기 때문에, 이를 고려해야함
- 제품 : 실서비스로 나가는 제품들을 개발자 관점에서 어떻게 봐야할지
- 목표 : 위에서 언급한 "도구"를 참고
- 코드 : 퀄리티 관리를 어떻게 해야하는지
- 상대적 : 위 키워드는 결국 "상대적"인 개념들임

### 강의에서 사용할 툴들

- 타입스크립트 플레이그라운드
- 코드샌드박스
- 공식문서
	- React
	- Redux
	- MobX
	- Redux-saga
	- Blueprint
		
		컴포넌트 만들기(with TS)의 좋은 사례들이 많은 UI 라이브러리
	- Testing Library

## TypeScript 개요
TS의 스펙은 JS의 superset이기 때문에, (당연히) JS의 모든 스펙을 사용 가능하다.

### 변수

변수를 선언할 때 어떤 타입인지 알기 때문에 **타입 추론**을 통해 변수의 타입을 추론할 수 있다.

```tsx
let foo = 10;
foo = false; // Type ERROR!

let bar: number = 20; // 명시적 선언을 할수 있음.
```

타입 추론(암묵적) vs 명시적 중 어느 것이 좋을까?

요즈음은 명시적이고 읽기 쉬운 코드가 좋다고 평가된다. 후자를 더욱 선호.

```tsx
function foo() {
  arguments[] ... // 암묵적인 처리... 보기 어려움
  return 0;
}

fucntion bar(..args) { // 명시적으로 가변변수를 받음
  return 0;
}

foo(1, 2);
bar(10, 20);
```

Primitive types 중 number는 다양하게 사용할 수 있다. 재활용성이 좋은 타입.

다만 타입의 의미를 주고 싶으면 **Type Alias**를 사용해보자.

```tsx
type Age = number;

let age: Age = 10;
let weight: number = 72;

age = weight; // Type Alias이기 떄문에 가능.
```
### TS compile
타입 체크는 컴파일 될때 체크되기 때문에 컴파일 될 떄만 작동된다. 그렇다면 TS에서 구현되어있는 스펙들은 모두 컴파일 될 때에만 작동되는 것일까? 전혀 아니다!

TS에서도 런타임까지 작동되는 스펙이 존재한다. 타입스크립트를 사용하면 런타임때 에러가 검출되지 않는다라는 말은 거짓이다.

### Type Alias vs Interface

```tsx
type Age = number;

type Foo = {
  age: Age;
  name: string;
}

interface Bar {
  age: Age;
  name: string;
}

const foo: Foo = {
  age: 10,
  name: 'kim',
}

const bar: Bar = {
  age: 10,
  name: 'kim',
}
```

이 두 차이는 거의 대채 가능할정도로 같은데, 이후 리엑트 타이핑할 때 다룰 예정이다.

## React

### Create React App

```bash
yarn create react-app tech-hello --template typescript
```

예전에는 React를 설정할 때 너무 많은 환경설정을 했어야만 했다. (Webpack, Babel 등...) 요즈음에는 CRA가 있어 한줄에 프로젝트를 설정할 수 있다!

```tsx
import React from 'react';

function App() {
  return (
    <h1 id="header">Tech Hello?</h1>
  );
  // return React.createElement("h1", {id: "header"}, "Tech Hello?");
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

App function의 리턴값이 뭔가 HTML문법 같다? 이는 JSX 문법임. JSX 문법은 컴포넌트를 쉽게 작성하는 방식. 리엑트가 리턴되는 h1 태그를 주석과 같이 바꿔준다.

엥? 리엑트 패키지를 사용하지 않는데 왜 import하지? → 컴파일 이후에 사용되기 때문!!

React Strict Mode는 프로덕션에서는 작동되지 않는, 에러를 잡아주는 컴포넌트

DOM이 단일 트리를 가지고 있기 때문에  ReactDOM(VIrtualDOM)도 단일 트리. 한번만 사용!

컴포넌트 만들기, 프롭스 받기

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

interface AppProps {
  title: string;
  color: string;
}

function App(props: AppProps) {
  return (
    <h1 color={ props.color }>{ props.title }</h1>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App title="Tech Hello?" color="red" />
  </React.StrictMode>,
  document.getElementById('root')
);
```

상태 : 시간에 따라서 값이 변하는 값

현제 구현한 App 컴포넌트는 불변한 "순수 함수 컴포넌트"

- CRA를 실무에서 사용하는건 어떤지?
  - CRA의 추가기능을 넣기에는 어렵다! 컨튜리뷰터 보면 보수적...
  - 다양한 환경에 대응하기 어려움 Only Local Product
  - 실사용에서는 CRA를 사용하는걸 비추

## 상태관리

Flux Architecture

리엑트 컴포넌트가 이뮤터블해야되기 때문에 전역 상태들을 어떻게 관리할것인가...

리엑트의 상태관리! Redux 거의 사용

리덕스는 간단하지만 간단한 걸로 복잡한걸 만드는건 어려움...

MobX? 리덕스의 대체품이라기 보단 상태를 관리하는 패러다임을 바꿈!

mobx와 리덕스의 관계는 ts와 js의 관계와 유사.