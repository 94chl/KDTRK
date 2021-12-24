<template>
  <div class="container">
    <h1>
      유저 정보 수정
    </h1>
    <form
      v-if="confirm"
      @submit.prevent="handleSubmit">
			<div class="test">
		<ProfileUploader/>
		</div>
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
        name="비밀번호"
        :require="false" />
      <Input
        v-model:text="passwordCheck"
        type="password"
        name="비밀번호 확인"
        :require="false"
      />
      <div class="error">
        {{ errorMessage }}
      </div>
      <button>정보 수정</button>
    </form>
    <form v-else @submit.prevent="loginConfirm">
      <label for="checkPW">비밀번호 입력</label>
      <input id="checkPW" v-model="passwordConfirm" type="password" />
    </form>
  </div>
</template>

<script >
import Input from "../components/Input.vue";
import {setUser,getUser} from "../storage/localStorage";
import login from "../api/login";
import updateUser from "../api/updateUser";
import userAuth from "../api/userAuth";
import updatePassword from "../api/updatePassword";
import ProfileUploader from "../components/ProfileUploader"
export default{
	components : {
		Input,
		ProfileUploader
	},
	data(){
		return {
			passwordConfirm : "",
			confirm : false,
			userName : "",
			nickName : "",
			phone : "",
			location : "",
			email : "",
			password : "",
			passwordCheck : "",
			errorMessage : "",
			grade : ""
		};
	},
	computed : {
		isLoading(){
			return this.$store.state.loading.isLoading;
		}
	},
	created(){
		const {userName,nickName,phone,location,grade} =JSON.parse(getUser().user.fullName);
		const email = getUser().user.email;
		this.userName = userName;
		this.nickName = nickName;
		this.phone = phone;
		this.location = location;
		this.email = email;
		this.grade = grade;
		userAuth();
	},
	methods : {
		async handleSubmit(){
			if(this.isLoading) return;
			const {userName, nickName, phone, location, grade,password,passwordCheck} = this;
			const payLoad = {
				userName,
				nickName,
				phone,
				location,
				grade,
			};
			if(password){
				if(password !== passwordCheck){
					alert("비밀번호가 다릅니다"); 
					this.$store.dispatch("loading/endLoading");
					return;
				}
				if(password.length < 6){
					alert("비밀번호가 짧습니다.");
					this.$store.dispatch("loading/endLoading");
					return;
				}
				await updatePassword(password);
			}
			try{
				this.$store.dispatch("loading/startLoading");
				const result  = await updateUser({
					username : this.userName,
					fullName : JSON.stringify(payLoad)
				});
				this.$store.dispatch("loading/endLoading");
				if(result){
					const {token} = getUser();
					setUser({token, user : result});
					this.$router.push({
						name : "main"
					});
				}}catch(e){
				alert("다시 입력해주세요");
				this.$store.dispatch("loading/endLoading");
			}
		},
		async loginConfirm(){
			try{
				const result = await login({
					email : this.email,
					password : this.passwordConfirm
				});
				if(result){
					this.confirm = true;
				}
			}catch(e){
				alert("비밀번호가 틀립니다");
			}
		}
	}
};
</script>

<style scoped lang="scss">
  @use "~/scss/font";
  @use "~/scss/button";
  @use "~/scss/color";
  .test {
    width: 100px;
    height: 100px;
  }
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
    @include button.default-style;
    @include font.medium;
    margin: 30px 0;
    width: 300px;
    height: 40px;
  }
  #checkPW {
    @include button.default-style;
    text-align: center;
    width: 300px;
    height: 30px;
    background: #fff;
    border: 1px solid color.$egg-yellow;
    color: #000;
    font-weight: 400;
    margin: 10px;

    &:focus {
      background: color.$egg-yellow;
      color: #fff;
    }
  }
  label {
    @include font.medium;
    text-align: center;
  }
</style>