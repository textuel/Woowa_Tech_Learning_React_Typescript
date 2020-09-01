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

# Overview

## 타입스크립트

- 자바스크립트의 Superset

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
- variable이 타입이 다르면 에러가 난다
- 타입을 명시하지 않아도 알아서 추론해서 세팅할 수 있다
- `let foo: number = 10;` 이런식으로 타입을 명시해야 한다
- 짧고 난해한 코드보단 읽기쉬운 코드를 선호한다
- 암묵적인 코드는 좋지 않다
- Primitive Type는 재활용으로 좋음
- type alias를 이용하여 의미 부여를 할 수 있다 (별명을 붙일 수 있다) `Type Age = number;`
- 컴파일에만 작동하는 요소와 컴파일이 끝나고도 작동하는 요소들이 있다
- Interface와 Type가 다른점은?
  - 비슷하다
  - 나중에 리엑트 수업할때 나옴


## React 설치
```
yarn create react-app tech-hello  --template typescript
```

- tsconfig.json이 컴파일러 옵션
- JSX는 리엑트가 제공하는 트랜스파일러 -> ES6 이상 자바스크립트 코드를 ES5 코드로 바꿔줌


## Redux
- 상태관리를 할 수 있게 해주는 라이브러리

## MobX
- 리덕스와 다름