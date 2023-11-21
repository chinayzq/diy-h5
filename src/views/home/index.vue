<template>
  <div class="home-page common-mobile-component">
    <CommonHeader />
    <div class="main-container">
      <img
        @click="jumpToWorkbench"
        class="main-logo"
        src="@/assets/images/main_icon.png"
        alt=""
      />
    </div>
    <div>
      <div style="margin-bottom: 20px">
        only sale phone cases and not original products, only adapters.
      </div>
      <CommonFooter />
    </div>
  </div>
</template>

<script setup>
import CommonHeader from "@/components/CommonHeader/index.vue";
import CommonFooter from "@/components/CommonFooter/index.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const jumpToWorkbench = () => {
  router.push("/workbench");
};
</script>

<style lang="less" scoped>
.home-page {
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
    display: flex;
    align-items: center;
    justify-content: center;
    .main-logo {
      cursor: pointer;
    }
  }
}
</style>
