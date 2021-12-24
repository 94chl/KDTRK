<template>
  <div class="container">
    <h1>
      회원가입 페이지
    </h1>
    <form @submit.prevent="handleSubmit">
      <Input
        v-model:text="userName"
        type="text"
        name="이름" />
      <Input
        v-model:text="nickName"
        type="text"
        name="별명" />
      <Input
        v-model:text="phone"
        type="text"
        name="전화번호" />
      <Input
        v-model:text="location"
        type="text"
        name="지역" />
      <Input
        v-model:text="email"
        type="text"
        name="이메일 주소" />
      <Input
        v-model:text="password"
        type="password"
        name="비밀번호" />
      <Input
        v-model:text="passwordCheck"
        type="password"
        name="비밀번호 확인" />
      <div
        class="error">
        {{ errorMessage }}
      </div>
      <button>회원가입</button>
    </form>
  </div>
</template>

<script >
import requestSignup from "../api/signup";
import Input from "../components/Input.vue";
import {setUser,removeStorage} from "../storage/localStorage";
import updateUser from "../api/updateUser";
export default{
	components : {
		Input
	},
	data(){
		return {
			userName : "",
			nickName : "",
			phone : "",
			location : "",
			email : "",
			password : "",
			passwordCheck : "",
			errorMessage : ""
		};
	},
	computed : {
		isLoading(){
			return this.$store.state.loading.isLoading;
		}
	},
	methods : {
		async handleSubmit(){
			const isPasswordEqual = this.passwordCheck === this.password;
			if(this.isLoading) return;
			if(!isPasswordEqual){
				this.errorMessage = "비밀번호가 서로 다릅니다.";
				return;
			}
			if(this.password.length < 6){
				this.errorMessage = "비밀번호가 너무 짧습니다.";
				return;
			}
			const {userName, nickName, phone, location,email,password} = this;
			const payLoad = JSON.stringify({
				userName,
				nickName,
				phone,
				location,
				grade : "1"
			});
			this.$store.dispatch("loading/startLoading");
			try{
				const result  = await requestSignup({
					email,
					fullName : payLoad,
					password,
					username : userName
				});
				setUser(result);
				const addedUser = await updateUser({
					username : userName,
					fullName : payLoad
				});
				this.$store.dispatch("loading/endLoading");
				setUser({token : result.token, user : addedUser});
				this.$router.push({
					name : "main"
				});
			}catch(e){
				this.$store.dispatch("loading/endLoading");
				alert("다시 입력해주세요");
				removeStorage(["user","token"]);
			}
		}
	}
};
</script>

<style scoped lang="scss">
	@use '~/scss/font';
	@use '~/scss/button';

h1 {
	@include font.large;
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.error {
	@include font.large;
  color: red;
}
button {
	@include font.medium;
	@include button.default-style;
	margin: 30px 0;
	width : 300px;
	height: 40px;
}
</style>