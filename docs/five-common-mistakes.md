---
title: 5 common mistakes
---

# 실무에서 저지르기 쉬운 5가지 실수 (수업에서는 시간상 3가지만 소개함)

## Vue 인스턴스를 init후에 값을 할당할때 주의사항 (vuex에서도 비슷함)
아래 코드에서 region값이 init후에 할당되는데 region에 대한 reactivity가 없어 값 할당에 실패합니다.

* [OLD] this.user.region = 'Pangyo';
  * init이후에 변경하는 값은 실시간으로 반영이 안되는 문제가 있음
* [NEW] this.$set(this.user, 'region', 'Pangyo');
  * $set을 통해서 강제로 주입해야 reactivity가 고려됩니다.

```html
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Reactivity Caveat 1</title>
</head>

<body>
  <div id="app">
    <div>
      <h1>User Info</h1>
      <p>Name : {{ user.name }}</p>
      <p>Email : {{ user.email }}</p>
      <p>Region : {{ user.region }}</p>
      <button @click="changeName">change Name</button>
      <button @click="changeRegion">change Region</button>
    </div>
    <div>
      <h1>User Data</h1>
      <div>
        {{ user }}
      </div>
    </div>
  </div>

  <!-- axios로 데이터를 받아오고 나서 obj.newItem 형식으로 데이터를 추가했을 때
  화면에 반응성이 없는 사례 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
  <script>
    let vm = new Vue({
      el: '#app',
      data: {
        user: {}
      },
      created() {
        this.fetchUsers();
      },
      methods: {
        fetchUsers() {
          fetch('https://jsonplaceholder.typicode.com/users/1')
            .then(response => response.json())
            .then(data => {
              this.user = data;
              // this.user.region = 'Pangyo';    // init이후에 변경하는 값은 실시간으로 반영이 안되는 문제가 있음
              this.$set(this.user, 'region', 'Pangyo'); // $set을 통해서 강제로 주입해야 reactivity가 고려됩니다.
            })
            .catch(error => console.log(error));
        },
        changeName() {
          this.user.name = 'Josh';
        },
        changeRegion() {
          // this.user.region = 'Seoul';  // init이후에 변경하는 값은 실시간으로 반영이 안되는 문제가 있음
          this.$set(this.user, 'region', 'Seoul');
          console.log('The region has been changed', this.user);
        }
      }
    })
  </script>
</body>

</html>
```



## 중복/반복 삭제

아래의 코드는 같은 내용이 반복되고 있습니다.
```html
    <ul>
      <li @click="removeItem">
        <span>메뉴 1</span>
        <div class="child hide">
          메뉴 설명
        </div>
      </li>
      <li @click="removeItem">
        <span>메뉴 2</span>
        <div class="child hide">
          메뉴 설명
        </div>
      </li>
      <li @click="removeItem">
        <span>메뉴 3</span>
        <div class="child hide">
          메뉴 설명
        </div>
      </li>
    </ul>
```

이 반복을 아래와 같이 수정할 수 있습니다.

```html
    <ul>
      <li v-for="(item, index) in items" @click="removeItem(index)">
        <span>{{ item }}</span>
        <div class="child hide" :ref="'listItem' + index">
          메뉴 설명
        </div>
        <div v-if="showChoices">
          메뉴 설명
        </div>
      </li>
    </ul>
```
