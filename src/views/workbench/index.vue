<template>
  <div class="workbench-component">
    <div class="header-container">
      <div class="model-case-container">
        {{ `${currentModel} / ${currentCase}` }}
        <var-icon name="chevron-down" />
      </div>
      <div class="print-button">PRINT</div>
    </div>
    <div class="graph-container">
      <!-- <img src="@/assets/images/model_temp.png" alt="" /> -->
    </div>
    <NavigationBar @naviClick="navigationEvent" />
    <!-- sticker弹出框 -->
    <var-popup
      overlay-class="popup-custom-overlay"
      position="bottom"
      v-model:show="stickersShow"
    >
      <StickersDialog />
    </var-popup>
    <!-- font弹出框 -->
    <var-popup
      overlay-class="popup-custom-overlay"
      position="bottom"
      v-model:show="fontShow"
    >
      <FontDialog />
    </var-popup>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavigationBar from "./components/navigationBar.vue";
import StickersDialog from "./components/stickersDialog.vue";
import FontDialog from "./components/fontDialog.vue";
// PC、IOS、Android
import { judgeClient } from "@/utils";
const currentModel = "iPhone 15 pro";
const currentCase = "Clear Impact Case - Black";
const navigationEvent = (type, file) => {
  console.log("type", type);
  switch (type) {
    case "stickers":
      stickersShow.value = true;
      break;
    case "font":
      fontShow.value = true;
      break;
    case "image":
      if (file) {
        console.log("file", file);
      }
      break;
    case "templates":
      break;
  }
};

const stickersShow = ref(false);

const fontShow = ref(false);
</script>

<style lang="less" scoped>
.workbench-component {
  position: relative;
  height: 100%;
  .header-container {
    position: absolute;
    top: 5px;
    left: 0;
    height: 45px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    .model-case-container {
      border: 1px solid rgb(143, 142, 136);
      color: #333;
      border-radius: 25px;
      overflow: hidden;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      display: flex;
    }
    .print-button {
      width: 90px;
      height: 30px;
      background-color: #d54492;
      color: #fff;
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
      font-family: JostMedium;
    }
  }
  .graph-container {
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 70%;
    }
  }
}
</style>