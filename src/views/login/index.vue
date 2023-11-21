<template>
  <div class="login-page common-mobile-component">
    <CommonHeader />
    <div class="main-container">
      <var-form ref="formIns" scroll-to-error="start">
        <var-space direction="column" :size="[30, 0]">
          <var-input
            variant="outlined"
            size="small"
            placeholder="User name *"
            :rules="[(v) => !!v || 'First name is required']"
            v-model="loginForm.userName"
          />
          <var-input
            variant="outlined"
            size="small"
            type="password"
            placeholder="Password *"
            :rules="[(v) => !!v || 'Password is required']"
            v-model="loginForm.password"
          />
        </var-space>
      </var-form>
      <var-button
        class="login-button"
        :loading="submitLoading"
        loading-type="wave"
        block
        type="primary"
        @click="loginSubmit"
        >Login</var-button
      >
    </div>
    <CommonFooter />
  </div>
</template>

<script setup>
import CommonHeader from "@/components/CommonHeader/index.vue";
import CommonFooter from "@/components/CommonFooter/index.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const loginForm = ref({
  userName: null,
  password: null,
});
const submitLoading = ref(false);
const formIns = ref(null);
const router = useRouter();
const loginSubmit = async () => {
  const formValid = await formIns.value.validate();
  if (!formValid) return;
  submitLoading.value = true;
  setTimeout(() => {
    // 登录完以后，跳转账号详情页
    submitLoading.value = false;
    router.push("/userInfo");
  }, 1000);
};
</script>

<style lang="less" scoped>
.login-page {
  background: #fff;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding: 0 20px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .main-container {
    flex: 1;
    margin-top: 30px;
    .login-button {
      margin-top: 30px;
    }
  }
}
</style>
