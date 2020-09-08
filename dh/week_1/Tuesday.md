>TODO 내일까지 마저 정리하기

# 커리큘럼

쓰는 자료

- https://www.typescriptlang.org/play
- https://codesandbox.io/index2
- https://reactjs.org/
- https://redux.js.org/
- https://mobx.js.org/README.html
- https://redux-saga.js.org/
- https://blueprintjs.com/
- https://testing-library.com/

```
상태 (State) : 어플리케이션은 즉 상태를 관리하는 것이 주 목표
환경 (Env) : 많은 환경에 대한 대응 및 개발 환경에 대한 관심
제품 (Product) : 개발을 하는 것뿐만 아니라 제품적인 측면으로 생각
목표 (Mission) : 많은 도구를 조합해 만드는 제품이 해결할 미션
코드 (Quality) : 코드의 퀄리티를 높일 수 있는 방법
상대적 (E=mc^2) : 위에 있는 모든 것은 사람마다 상대적
```

> 민수님, 이부분 훔쳐봤습니다...

# Overview

## 타입스크립트란?

- 마이크로소프트가 개발하고 유지하고 있는 오픈소스 프로그래밍 언어
- ESNext에 타입 기능을 추가 (ESNext: ES5 이후 버전)

### 타입이 있으면 좋은 이유?

- 코드가 더 읽기 쉽다
- 디버깅을 더 쉽게 할 수 있다
- 컴파일러가 어디에서 문제가 생겼는지 알려준다
- 리팩토링이 쉬워진다

> TypeScript will help you finding all the usages of the refactored bit, renaming it, and alerting you with a compile error in case your code has any type mismatches after the refactor.

[링크](https://medium.com/@jtomaszewski/why-typescript-is-the-best-way-to-write-front-end-in-2019-feb855f9b164)

### 트랜스파일?

- ESNext는 Babel이라는 Transpiler를 통해 ES5 코드로 나온다
- TypeScript는 TSC(TypeScript Compiler)를 통해 ES5 코드로 나온다

아래의 코드는 https://www.typescriptlang.org/play 에서 돌림

```
let age: Age = 10;

type Age = {
    age: Age;
    name: string;
}

interface Bar {
    age: Age;
    name: string;
}

type Foo = {
    age: number;
    name: string;
}

const foo: Foo = {
    age: 10,
    name: 'kim
}

```

### 타입 지정

1. 타입 주석과 타입 추론

```TypeScript

let n: number = 1

let m = 2

```

- 콜론 뒤에 타입을 쓸 수 있는데, 이걸 타입 주석(type annotation)이라고 한다
- 타입을 명시하지 않아도 알아서 추론하도록 세팅할 수 있다
- variable의 타입이 다르면 에러가 난다
- `let foo: number = 10;` 이런식으로 타입을 명시해야 한다
- 암묵적인 코드는 좋지 않다 (코드를 알아보기 쉽지 않기 때문에)

### 타입 별칭

```
Type Age = number;
let a: Age = 10;
```
- type alias를 이용하여 별명을 붙일 수 있다
- 별명을 붙이는 이유는 가독성을 높이기 위해서다

### 객체 타입
```
type Foo = {
    age: number;
    name: string;
}

const foo: Foo = {
    age: 10,
    name: "Kim,
}
```
```
type Age = number;

interface Bar {
    age: Age;
    name: string;
}

const bar: Bar = {
    age: 10,
    name: "Kim",
};
```

- 두가지 방법이 있다
- Interface와 Type가 다른점은?
  - 비슷하다
  - 나중에 리엑트 수업할때 나옴

## React 설치

```
yarn create react-app tech-hello  --template typescript
```

리엑트 코드는 [Link](../dh/week_1/code/tech-hello)

- tsconfig.json이 컴파일러 옵션
- JSX는 리엑트가 제공하는 트랜스파일러 -> ES6 이상 자바스크립트 코드를 ES5 코드로 바꿔줌

## Redux

- Flux개념을 바탕으로한 State 관리 라이브러리


## MobX

- 리덕스와 다름
- 객체지향 느낌이 강함
- 깔끔한 느낌? 처음 사용하면 편함
