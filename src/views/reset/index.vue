<template>
  <div class="reset-page common-mobile-component">
    <CommonHeader />
    <div class="main-container">
      <Loading v-show="pageLoading" :size="20" />
      <var-form ref="formIns" scroll-to-error="start" class="margin-top">
        <var-space direction="column" :size="[30, 0]">
          <var-input
            variant="outlined"
            size="small"
            placeholder="email *"
            :rules="[(v) => !!v || 'email is required']"
            v-model="formData.email"
          />
          <var-input
            variant="outlined"
            size="small"
            type="password"
            placeholder="New Password *"
            :rules="[(v) => !!v || 'New Password is required']"
            v-model="formData.password"
          />
          <var-input
            variant="outlined"
            size="small"
            type="password"
            placeholder="Confirm New Password *"
            :rules="[(v) => !!v || 'Confirm New Password is required']"
            v-model="formData.password2"
          />
        </var-space>
      </var-form>
      <div class="link-button margin-top" @click="resetPassword()">
        RESET PASSWORD
      </div>
    </div>
    <CommonFooter />
  </div>
</template>

<script setup>
import CommonHeader from "@/components/CommonHeader/index.vue";
import CommonFooter from "@/components/CommonFooter/index.vue";
import { ref } from "vue";
import { setNewPassword } from "@/api/workbench";
import { useRoute, useRouter } from "vue-router";
import { Snackbar } from "@varlet/ui";

const route = useRoute();
const formIns = ref(null);
const formData = ref({
  email: null,
  password: null,
  password2: null,
  code: route.query.code,
  checkCode: route.query.checkCode,
});
const pageLoading = ref(false);
const router = useRouter();
const resetPassword = async () => {
  const formValid = await formIns.value.validate();
  if (!formValid) return;
  pageLoading.value = true;
  setNewPassword(formData.value)
    .then((res) => {
      if (res.code === 200) {
        Snackbar.success("Password set successfully, please log in");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        Snackbar.error(res.message);
      }
    })
    .finally(() => {
      pageLoading.value = false;
    });
};
</script>

<style lang="less" scoped>
.reset-page {
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
    overflow: auto;
    .margin-top {
      margin-top: 20px;
    }
    .link-button {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background: #e73295;
      font-family: "JostMedium";
      border-radius: 5px;
      color: #fff;
    }
  }
}
</style>