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
      <img src="@/assets/images/model_temp.png" alt="" />
    </div>
    <NavigationBar @naviClick="navigationEvent" />
  </div>
</template>

<script setup>
import NavigationBar from "./components/navigationBar.vue";
// PC、IOS、Android
import { judgeClient } from "@/utils";
const currentModel = "iPhone 15 pro";
const currentCase = "Clear Impact Case - Black";
const navigationEvent = (type) => {
  console.log("type", type);
  switch (type) {
    case "stickers":
      break;
    case "font":
      break;
    case "image":
      break;
    case "templates":
      break;
  }
};
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