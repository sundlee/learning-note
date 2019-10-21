---
title: test
---

# Vue Test Utils

Vue Test Utils 은 Vue.js를 위한 공식 유닛 테스트 유틸리티입니다.

* [@vue/test-utils main page](https://vue-test-utils.vuejs.org/)
* [@vue/test-utils github page](https://github.com/vuejs/vue-test-utils)


## 설치

다음 명령어를 사용해서 Vue Test Utils를 설치 할 수 있습니다.

```bash
npm install --save-dev @vue/test-utils
```

## 기본

* describe: 테스트 suite를 의미함
* test: 테스트케이스 한개를 의미함

```javascript
describe('테스트수트 이름', () => {
  test('테스트케이스 이름', () => {
    expect(true).toBeTruthy();
  });
});

```

## shallowMount

mounted이면서 rendered 상태인 Vue component를 포함하는 wrapper를 생성하여 리턴합니다.

```javascript
import { shallowMount } from '@vue/test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = shallowMount(Foo, {
      propsData: {
        color: 'red'
      }
    })
    expect(wrapper.props().color).toBe('red')
  })
})
```

## crud예제를 테스트

```javascript
  test('username이 이메일 형식이 아니면 유효성 검사 텍스트가 표시', () => {
    const wrapper = shallowMount(LoginView, {
      data() {
        return {
          username: 'testm',
        };
      },
    });
    let validationTextTag = wrapper.find('p');
    console.log(validationTextTag.element);
    expect(validationTextTag.element).toBeTruthy();
  });

  test('username이 이메일이 아니면 로그인 버튼 비활성화', () => {
    const wrapper = factory({ username: 'test' });
    let loginButton = wrapper.find('button');
    let disabled = loginButton.element.disabled;
    expect(disabled).toBeTruthy();
  });
```
