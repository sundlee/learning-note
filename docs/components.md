---
title: Components
---

# Component

컴포넌트는 화면을 여러개의 구성으로 구분하여 개발할 수 있도록해주는 뷰의 기능입니다. 컴포넌트를 사용해서 개발하면 재사용성이 올라가 생산성을 높일 수 있습니다.


## 컴포넌트 생성 코드 형식

컴포넌트를 생성하는 코드 형식은 아래와 같습니다.

```js
Vue.component('컴포넌트 이름', {
  // 컴포넌트 내용
});
```

## 컴포넌트 생성 후 표시하기

위 코드 형식을 참고하여 간단한 앱 헤더 컴포넌트를 만들어보겠습니다.

```js
Vue.component('app-header', {
  template: '<h1>Header Component</h1>'
});
```

위에서 등록한 컴포넌트를 화면에서 표시하려면 아래와 같이 컴포넌트 태그(컴포넌트 이름)를 추가합니다.

```html
<div id="app">
  <app-header></app-header>
</div>
```

div 태그에 뷰 인스턴스가 생성되어 있다는 가정하에 위 템플릿 코드는 결과적으로 아래와 같이 표시됩니다.

```html
<div id="app">
  <h1>Header Component</h1>
</div>
```

## 컴포넌트 등록 방법 2가지

컴포넌트를 등록하는 방법은 크게 2가지가 있습니다. 앞에서 살펴본 방식은 전역 컴포넌트를 등록하는 방법입니다.

```js
// 전역 컴포넌트 등록
Vue.component('app-header', {
  template: '<h1>Header Component</h1>'
});
```

또 다른 방법은 지역 컴포넌트로 등록하는 방법이 있습니다. 앞에서 사용한 컴포넌트 내용을 가지고 그대로 지역 컴포넌트로 등록하면 아래와 같습니다.

```js
var appHeader = {
  template: '<h1>Header Component</h1>'
}

new Vue({
// 지역 컴포넌트 등록
  components: {
    'app-header': appHeader
  }
})
```
