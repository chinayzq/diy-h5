<template>
  <div class="loading-component">
    <img
      :style="{
        width: `${props.size}%`,
      }"
      :src="$LoadingImage"
      alt=""
    />
  </div>
</template>

<script setup>
const props = defineProps({
  size: {
    type: Number,
    default() {
      return 20;
    },
  },
});
</script>

<style lang="less" scoped>
.loading-component {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9999;
}
</style>