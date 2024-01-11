<template>
  <div class="home-page common-mobile-component">
    <CommonHeader source="home" />
    <div
      :class="[
        'main-container',
        currentEnv === 'memtoys' && 'mian-container-background',
      ]"
    >
      <img
        @click="jumpToWorkbench"
        v-if="currentEnv === 'memtoys'"
        class="main-logo"
        src="@/assets/images/main_icon.png"
        alt=""
      />
      <img
        @click="jumpToWorkbench"
        v-if="currentEnv === 'colgifts'"
        class="main-logo"
        src="@/assets/images/main_icon_colgifts.png"
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
import config from "~/config";
import { ref } from "vue";
const currentEnv = ref(config[import.meta.env.MODE].env);
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
    flex: 1;
    .main-logo {
      cursor: pointer;
      width: 200px;
    }
  }
  .mian-container-background {
    background: linear-gradient(
        rgba(255, 255, 255, 0.3),
        rgba(255, 255, 255, 0.3)
      ),
      url("../../assets/images/home_main_background.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 80%;
  }
}
</style>
