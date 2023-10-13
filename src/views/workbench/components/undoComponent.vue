<template>
  <div class="undo-component">
    <img
      class="operation-icon"
      src="@/assets/images/graph_undo_active.png"
      alt=""
    />
    <img
      class="overturn operation-icon"
      src="@/assets/images/graph_undo_default.png"
      alt=""
    />
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.undo-component {
  z-index: 10;
  position: absolute;
  left: 15px;
  bottom: 80px;
  height: 44px;
  display: flex;
  gap: 0 20px;
  align-items: center;
  .operation-icon {
    width: 22px;
    height: 18px;
    cursor: pointer;
  }
  .overturn {
    transform: rotateY(180deg);
  }
}
</style>