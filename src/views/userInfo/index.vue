<template>
  <div class="user-info-page common-mobile-component">
    <CommonHeader />
    <div class="main-container">
      <div class="main-title">Account</div>
      <div class="margin-top">Welcome back, yijames</div>
      <div>Start/Countinue</div>
      <div class="second-title">Order history</div>
      <div class="second-title">Account details</div>
    </div>
    <CommonFooter />
  </div>
</template>

<script setup>
import CommonHeader from "@/components/CommonHeader/index.vue";
import CommonFooter from "@/components/CommonFooter/index.vue";
</script>

<style lang="less" scoped>
.user-info-page {
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
    .main-title {
      font-size: 20px;
      color: #000;
    }
    .main-title {
      font-size: 18px;
      color: #000;
    }
    .margin-top {
      margin-top: 10px;
    }
  }
}
</style>