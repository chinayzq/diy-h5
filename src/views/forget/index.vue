<template>
  <div class="forget-page common-mobile-component">
    <CommonHeader />
    <Loading v-show="pageLoading" :size="20" />
    <div class="main-container">
      <div v-if="!hasSendEmail">
        <div class="tips-container">
          Lost your password? Please enter your username or email address. You
          will receive a link to create a new password via email.
        </div>
        <var-form ref="formIns" scroll-to-error="start" class="margin-top">
          <var-space direction="column" :size="[30, 0]">
            <var-input
              variant="outlined"
              size="small"
              placeholder="email *"
              :rules="[(v) => !!v || 'email is required']"
              v-model="formData.email"
            />
          </var-space>
        </var-form>
        <div class="error-tip">
          {{ errorTips }}
        </div>
        <div class="link-button margin-top" @click="sendResetEmail()">
          RESET PASSWORD
        </div>
      </div>
      <div v-else>
        <div class="tips-container">
          A password reset email has been sent to the email address on file for
          your account, but may take several minutes to show up in your inbox.
          Please wait at least 10 minutes before attempting another reset.
        </div>
      </div>
    </div>
    <CommonFooter />
  </div>
</template>

<script setup>
import CommonHeader from "@/components/CommonHeader/index.vue";
import CommonFooter from "@/components/CommonFooter/index.vue";
import { ref } from "vue";
import { sendPasswordMail } from "@/api/workbench";

const hasSendEmail = ref(false);

const formIns = ref(null);
const formData = ref({
  email: null,
});
const errorTips = ref(null);
const pageLoading = ref(false);
const sendResetEmail = async () => {
  let valid = await formIns.value.validate();
  if (valid) {
    pageLoading.value = true;
    errorTips.value = null;
    sendPasswordMail(formData.value)
      .then((res) => {
        if (res.code === 200) {
          hasSendEmail.value = true;
        } else {
          errorTips.value = res.message;
        }
      })
      .finally(() => {
        pageLoading.value = false;
      });
  }
};
</script>

<style lang="less" scoped>
.forget-page {
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
    .tips-container {
      position: relative;
      line-height: 20px;
      padding: 5px;
      background: #f8f7f7;
      &::before {
        content: "";
        display: inline-block;
        height: 2px;
        width: 100%;
        background: #e73295;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
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
    .error-tip {
      margin-top: 15px;
      color: #ff0000;
    }
  }
}
</style>