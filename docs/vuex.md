---
title: VueX
---

# VueX 상태 관리

상태 관리란 현대 프런트엔드 프레임워크에서 모두 사용하는 개발 패턴입니다. 뷰에서는 뷰엑스(Vuex)라는 상태 관리 패턴을 사용합니다. 상태 관리가 필요한 이유는 컴포넌트의 숫자가 많아졌을 때 컴포넌트 간의 데이터 전달이나 관리가 어렵기 때문입니다. 데이터 전달을 더 명시적이고 효율적으로 하기 위한 방법이 상태 관리입니다.

## VueX 소개

VueX란 뷰의 상태 관리 패턴이자 라이브러리입니다. 아래는 뷰엑스의 개념을 단순하게 도식화한 그림입니다.

![VueX 컨셉](./vuex-concept.png)

화면(View) -> 화면에서의 이벤트 발생(Actions) -> 데이터 변경(State)의 단방향 데이터 흐름이 특징입니다.

## VueX 기술 요소

VueX의 주요 기술 요소는 다음과 같습니다.

- state
- getters
- mutations
- actions

각 속성에 대한 자세한 설명은 해당 챕터에서 확인하겠습니다.

## VueX 설치

VueX를 프로젝트에 설치하기 위해서 아래의 방법을 따릅니다.

### CDN 방식

```html
<script src="https://unpkg.com/vuex"></script>
```

### NPM 방식

```bash
npm install vuex --save
```

## VueX 등록

VueX를 등록하기 위해서는 뷰 라우터와 마찬가지로 뷰 스토어를 하나 생성해야 합니다.

```js
// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  // ..
});
```

뷰 스토어를 하나 생성하고 나서 ES6 import/export 문법으로 main.js 파일의 인스턴스에 주입합니다.

```js
// main.js
import Vue from 'vue';
import { store } from './store.js';

new Vue({
  store: store
})
```

## VueX 구조도

VueX의 전체 흐름을 나타낸 그림입니다.

![VueX 컨셉](./vuex-flow.png)

데이터의 흐름은 Actions -> Mutations -> State 순서임을 알 수 있습니다.


# state

상태(state)는 여러 컴포넌트 간에 공유되는 데이터를 의미합니다.

## state 선언

상태는 아래와 같이 정의합니다.

```js
new Vuex.Store({
  state: {
    message: 'Hello Vue.js'
  }
})
```

위 코드는 `message` 라는 상태 값을 정의한 코드입니다.

## state 접근

위 `message` 상태 값을 컴포넌트에서 접근하기 위해서는 아래와 같이 코딩합니다.

```html
<div>{{ this.$store.state.message }}</div>
```

코드를 실행하면 화면에 Hello Vue.js가 출력됩니다.


# getters

getters 속성은 computed 속성과 매칭되는 기술 요소입니다. 상태(state) 값이 변경되었을 때 변화에 따른 차이를 자동으로 반영하여 값을 계산해줍니다. 

## getters 선언

getters 속성은 다음과 같이 정의합니다.

```js
new Vuex.Store({
  state: {
    message: 'Hello Vue.js'
  },
  getters: {
    reverseMessage(state) {
      return state.message.split('').reverse().join('');
    }
  }
})
```

위 코드는 `reverseMessage` 라는 getters 속성을 선언하여 상태 값 message의 문자열 순서를 거꾸로 뒤집는 코드입니다.

## getters 접근

getters 속성은 컴포넌트에서 아래와 같이 접근합니다.

```html
<div>{{ this.$store.getters.reverseMessage }}</div>
```

코드를 실행하면 화면에 sj.euV olloeH가 출력됩니다.


# mutations

뮤테이션(mutations)은 뷰엑스에서 상태 값을 변경하는 유일한 방법입니다. 상태는 항상 뮤테이션으로 변경됩니다.

## mutations 선언

뮤테이션을 선언하는 코드입니다.

```js
new Vuex.Store({
  state: {
    message: 'Hello Vue.js'
  },
  mutations: {
    reverseMessage(state) {
      state.message = state.message.split('').reverse().join('');
    }
  }
})
```

위 코드는 뮤테이션의 `reverseMessage()` 메서드를 이용하여 `message` 상태 값을 역순으로 변환하는 코드입니다. 

## mutations 호출

컴포넌트에서 뮤테이션을 호출하려면 `commit()` API를 사용해야 합니다. 코드를 살펴보겠습니다.

```js {4}
new Vue({
  methods: {
    reverseMsg() {
      this.$store.commit('reverseMessage');
    }
  }
})
```

위 컴포넌트에서 `reverseMsg()` 메서드를 호출하면 바로 `reverseMessage()` 뮤테이션이 호출되면서 상태 값이 변환됩니다.

# actions

액션(actions)은 뮤테이션 중에서 비동기 처리 로직들을 정의하는 속성입니다. 동기 처리는 뮤테이션, 비동기 처리는 액션으로 이해하시면 됩니다. 혹시 자바스크립트의 비동기 처리에 대해서 잘 모르시는 분들은 [이 글](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)을 참고하세요.

## actions 선언

액션을 정의하는 코드입니다. 앞 [뮤테이션 챕터](#mutations-선언)에서 살펴봤던 코드를 살짝 바꿔봤습니다. 뮤테이션 코드에서는 컴포넌트 단에서 `commit('reverseMessage')` API를 호출하여 state 속성에 정의되어 있던 상태 값을 변환했습니다.

```js
new Vuex.Store({
  state: {
    message: ''
  },
  mutations: {
    reverseMessage(state, data) {
      state.message = data.split('').reverse().join('');
    }
  },
  actions: {
    fetchMessage(context) {
      axios.get(url).then(function(response) {
        context.commit('reverseMessage', response.message);
      });
    }
  }
})
```

이번에는 컴포넌트 단에서 액션을 호출하고 나면 `fetchMessage()` 라는 액션 메서드가 동작합니다. `fetchMessage()` 메서드는 HTTP 통신을 처리하기 때문에 비동기 코드가 되고, GET 요청의 응답으로 온 값을 뮤테이션의 인자로 넘겨서 역순으로 변환한 다음에 `message` 상태 값에 담아줍니다.

## actions 호출

액션을 컴포넌트에서 호출하는 방법은 아래와 같습니다.

```js
new Vue({
  methods: {
    getMessage() {
      this.$store.dispatch('fetchMessage');
    }
  }
})
```

`getMessage()` 메서드를 호출하면 액션의 `fetchMessage()` 속성 함수가 실행됩니다.

