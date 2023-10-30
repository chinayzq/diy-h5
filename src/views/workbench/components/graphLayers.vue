<template>
  <div class="graph-layers-component" v-if="store.client === 'PC'">
    <div class="layer-header">
      <img src="@/assets/images/project_logo.png" alt="" />
    </div>
    <div class="main-container">
      <div class="left-part">
        <div class="single-icon">
          <img src="@/assets/images/layer-icon.png" alt="" />
        </div>
      </div>
      <div class="right-part">
        <div class="single-image">
          <div
            :class="['single-layer', item.active && 'single-layer-active']"
            v-for="(item, index) in layers"
            :key="index"
            @click.stop="setActive(item)"
          >
            <span class="text-one" v-if="item.type === 'text'">
              {{ item.content }}
            </span>
            <img v-else class="image-one" :src="item.url" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "@/stores";
import { ref } from "vue";
const store = useStore();

const props = defineProps({
  layers: {
    type: Array,
    default() {
      return [];
    },
  },
});

const emit = defineEmits();
const setActive = ({ id }) => {
  emit("setActive", id);
};
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
    border-bottom: 1px solid #e6e9ef;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 90%;
    }
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
        text-align: center;
        .single-layer {
          display: inline-block;
          width: 70px;
          height: 70px;
          margin-bottom: 10px;
          border: #ffffff solid 2px;
          .image-one {
            height: 100%;
            width: 100%;
          }
        }
        .single-layer-active {
          border: aqua solid 2px;
        }
      }
    }
  }
}
</style>