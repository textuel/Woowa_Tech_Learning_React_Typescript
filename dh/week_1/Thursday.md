# JavaScript의 전체적인 흐름

## 변수 만드는 방법
```
var x = 10;
let y = 10;
const z = 10;
```
- 프로그래밍언어는 양키들이 많다
- 만든 사람의 철학이 녹아 있다
- 서양 사상: 합리주의, 논리
- 바닥에 깔려 있는 기본 원리를 가지고 쌓아간다
- 그래서 아무리 복잡해도 이해할 수 있다
- 변수에는 값을 넣을 수 있다
- 함수도 값으로써 변수에 넣을 수 있다 


## 함수
```
//함수 정
function foo(x) {
    return 0;
}


```
- 함수는 반드시 값을 반환하게 되어 있다.
- 값을 반환하는 방법
  - Return
  - Undefined
- 코드를 묶어놓은 값
```
//함수 식
const bar = function () {

};

bar()

```
- 함수를 값으로 취급할때 이름을 생략할 수 있다
- 재귀호출을 할려면 이름이 필요하다

```
(function() {

})()
```
- 단 한번만 실행되는 function
- 초기화 코드 등을 써야 할때

```
function foo(x){
    x();
    return function() {

    }
}

const y = foo(function(){

})
```
- 매개변수로 함수를 전달 할 수 있다
- 콜백함수 = 다른 함수한테 함수의 호출을 위임하는 것

```
const foo = function (x) {

};

//화살표 함수
const foo = (x) => {
    
}

const foo = (x, y) => {
    return x * 2;
}

```
- 화살표 함수
- 함수가 값을 반환하는데 함수보다는 식에 참여했을 때
- 식: 실행한 결과가 값일때
- 문: 조건문, 반복문

```
//동적 바인딩
const x  = {
    y: 5;
};

x.name = 10;

//동적 바인딩 이용
function foo() {
    this.name = 10;
}

class bar {
    constructor() {
        this.name = 10;
    }
}

console.log(new bar())
```

- new 하면 빈 객체를 만들어서 함수에게 전달, this로 호출 가능
- 사용자 정의 객체 타입 또는 내장 객체 타입의 인스턴스를 생성

```
const person = {
    name: '강동헌',
    getName() = {
        return this.name;
    }
}

console.log(person.getName())

const man = person.getName;

console.log(man())
```
```
function foo() {
    return function bar() {
        return x;
    }
}

const f = foo(10);

console.log(f())
```

## Redux 만들기