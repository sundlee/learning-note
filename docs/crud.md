---
title: CRUD
---

# 서버

1. 회원가입: https://mlab.com/
2. db생성, 사용자생성, 접속 정보를 복사
3. `6_advanced > vue-til > srv > server > app.js`의 mongodb접속 정보를 수정
  `mongoose.connect('mongodb+srv://{username}:{password}@cluster0-ijfwx.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });`
4. 6_advanced > vue-til > srv > server 에서 터미널을 열고
5. npm run dev 실행
  * http://localhost:3000/api/docs/ 을 open

![swagger](./swagger.png)

# 클라이언트

## signup component
![signup](./signup.png)

```html
<template>
	<div>
		<form @submit.prevent="submitForm">
			<div>
				<label for="">email:</label>
				<input type="text" v-model="username" />
			</div>
			<div>
				<label for="">password:</label>
				<input type="text" v-model="password" />
			</div>
			<div>
				<label for="">nickname:</label>
				<input type="text" v-model="nickname" />
			</div>
			<button type="submit">회원 가입</button>
		</form>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			username: '',
			password: '',
			nickname: '',
		};
	},
	methods: {
		submitForm() {
			let url = 'http://localhost:3000/signup';
			let data = {
				username: this.username,
				password: this.password,
				nickname: this.nickname,
			};
			axios
				.post(url, data)
				.then(response => console.log(response))
				.catch(error => console.log(error));
		},
	},
};
</script>

<style></style>
```
## login component

![login](./login.png)

```html
<template>
	<div>
		<form @submit.prevent="submitForm">
			<div>
				<label for="">email:</label>
				<input type="text" v-model="username" />
			</div>
			<div>
				<label for="">password:</label>
				<input type="text" v-model="password" />
			</div>
			<button type="submit" :disabled="!isValidUsername">로그인</button>
			<p v-if="!isValidUsername">email is not valid</p>
		</form>
		<!-- <button @click="fetchItem">게시글 조회</button> -->
	</div>
</template>

<script>
import { loginUser } from '../api/account.js';

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export default {
	data() {
		return {
			username: '',
			password: '',
			testValue: 10,
		};
	},
	computed: {
		isValidUsername() {
			if (!this.username) {
				return true;
			}
			return validateEmail(this.username);
		},
	},
	methods: {
		submitForm() {
			let data = {
				username: this.username,
				password: this.password,
			};
			loginUser(data)
				.then(response => {
					let token = response.data.token;
					this.$store.commit('setToken', token);
					this.$router.push('/home');
					// this.$router.push({
					// 	path: '/home',
					// 	name: 'home',
					// 	query: {},
					// 	// ...
					// });
				})
				.catch(error => console.log(error));
		},
	},
};
</script>

<style></style>
```
