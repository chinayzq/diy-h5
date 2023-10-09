<template>
  <div class="loading-component">
    <img
      :style="{
        width: `${props.size}%`,
      }"
      src="@/assets/images/load.gif"
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
}
</style>