<template>
  <div class="flip-dialog">
    <div class="title-line">
      <span class="title-span"> Flip </span>
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
        v-for="(item, index) in flipList"
        :key="index"
        @click.stop="flipIconClick(item)"
      >
        <div
          :class="['icon-line', `icon-line-${item.key}`]"
          :style="{
            transform: `rotate(${item.rotate}deg)`,
          }"
        ></div>
        <div class="label-line">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const flipList = ref([
  {
    label: "Horizontal Flip",
    key: "horizontal",
    rotate: 0,
    clicked: false,
  },
  {
    label: "Vertical Flip",
    key: "vertical",
    rotate: 90,
    clicked: false,
  },
]);

const emit = defineEmits();
const flipIconClick = (item) => {
  item.clicked = !item.clicked;
  emit("flipEvent", item.key, item.clicked);
};
</script>

<style lang="less" scoped>
.flip-dialog {
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
      .icon-line-horizontal {
        background-image: url("../../../assets/images/home_bar_flip.png");
      }
      .icon-line-vertical {
        background-image: url("../../../assets/images/home_bar_flip.png");
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