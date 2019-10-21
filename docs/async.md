---
title: Async & Await
---

# Async & Await

어싱크 어웨이트는 자바스크립트 비동기 처리 패턴의 최신 문법입니다. Promise와 Callback에서 주는 단점들을 해결하고 자바스크립트의 비동기적 사고 방식에서 벗어나 동기적(절차적)으로 코드를 작성할 수 있게 도와줍니다.

## 기본 문법

async 함수의 기본 문법은 다음과 같습니다.

```js
async function fetchData() {
  await getUserList();
}
```

async 함수는 함수의 앞에 `async`를 붙여주고 함수의 내부 로직 중 비동기 처리 로직 앞에 `await`를 붙여주면 됩니다. 좀 더 정확하게 말하면 Promise 객체를 반환하는 API 호출 함수 앞에 `await`를 붙입니다. 

## 기본 예제

다음 코드를 보겠습니다.

```js
async function fetchData() {
  var list = await getUserList();
  console.log(list);
}

function getUserList() {
  return new Promise(function(resolve, reject) {
    var userList = ['user1', 'user2', 'user3'];
    resolve(userList);
  });
}
```

`fetchData()` 함수에서 `getUserList()` 함수를 호출하고 나면 Promise 객체가 반환됩니다. 그리고 그 Promise는 실행이 완료된 상태(resolve)이며 실행의 결과로 `userList` 배열을 반환하고 있습니다. 따라서 `fetchData()`를 호출하면 `userList`의 배열이 출력됩니다.

```js
fetchData(); // ['user1', 'user2', 'user3']
```
