<template>
  <div class="graph-layers-component" v-if="store.client === 'PC'">
    <div class="layer-header"></div>
    <div class="main-container">
      <div class="left-part">
        <div class="single-icon">
          <img src="@/assets/images/layer-icon.png" alt="" />
        </div>
      </div>
      <div class="right-part">
        <div class="single-image" v-for="single in layerList" :key="single">
          <img src="@/assets/images/layer-example.webp" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/stores";
import { ref } from "vue";
const store = useStore();

const layerList = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}]);
</script>

<style lang="less" scoped>
.graph-layers-component {
  width: 120px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: #fff;
  .layer-header {
    height: 100%;
    height: 48px;
    background: url("../../../assets/images/project_logo.png");
    background-size: 100% 100%;
    border-bottom: 1px solid #e6e9ef;
  }
  .main-container {
    height: calc(100vh - 48px);
    display: flex;
    .left-part {
      height: 100%;
      width: 40px;
      border-right: 1px solid #e6e9ef;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5px 0;
      .single-icon {
        width: 32px;
        height: 32px;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .right-part {
      height: 100%;
      width: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 5px 0;
      overflow: auto;
      .single-image {
        width: 80px;
        height: 80px;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}
</style>