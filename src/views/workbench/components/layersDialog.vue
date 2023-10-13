<template>
  <div class="layers-dialog">
    <div class="title-line">
      <span class="title-span"> Layers </span>
      <var-icon
        class="close-icon"
        name="window-close"
        :size="30"
        @click="emit('close')"
      />
    </div>
    <div class="icon-container">
      <div
        class="single-item"
        v-for="(item, index) in layersList"
        :key="index"
        @click.stop="layersIconClick(item)"
      >
        <div :class="['icon-line', `icon-line-${item.key}`]"></div>
        <div class="label-line">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const layersList = ref([
  {
    label: "Top",
    key: "top",
  },
  {
    label: "Bottom",
    key: "bottom",
  },
  {
    label: "Bring Forward",
    key: "forward",
  },
  {
    label: "Bring Backward",
    key: "backward",
  },
]);

const emit = defineEmits();
const layersIconClick = ({ key }) => {
  emit("layerEvent", key);
};
</script>

<style lang="less" scoped>
.layers-dialog {
  height: 130px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .title-line {
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    .title-span {
      font-family: "JostMedium";
      font-size: 20px;
      font-style: normal;
      color: rgba(0, 0, 0, 0.9);
    }
    .close-icon {
      position: absolute;
      right: 10px;
      top: 5px;
    }
  }
  .icon-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .single-item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      .icon-line {
        height: 33px;
        width: 33px;
        background-size: 100% 100%;
      }
      .icon-line-top {
        background: url("../../../assets/images/layers_top_icon.png");
      }
      .icon-line-bottom {
        background: url("../../../assets/images/layers_bottom_icon.png");
      }
      .icon-line-forward {
        background: url("../../../assets/images/layers_forward_icon.png");
      }
      .icon-line-backward {
        background: url("../../../assets/images/layers_backward_icon.png");
      }
      .label-line {
        color: #5c5c66;
        font-size: 12px;
        margin-top: 5px;
      }
    }
  }
}
</style>