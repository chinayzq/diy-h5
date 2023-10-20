<template>
  <div class="undo-component">
    <span @click.stop="canUndo && emit('clickEvent', 'undo')">
      <img
        v-if="canUndo"
        class="operation-icon"
        src="@/assets/images/graph_undo_active.png"
        alt=""
      />
      <img
        v-else
        class="operation-icon"
        src="@/assets/images/graph_undo_default.png"
        alt=""
      />
    </span>
    <span @click.stop="canDo && emit('clickEvent', 'do')">
      <img
        v-if="canDo"
        class="overturn operation-icon"
        src="@/assets/images/graph_undo_active.png"
        alt=""
      />
      <img
        v-else
        class="overturn operation-icon"
        src="@/assets/images/graph_undo_default.png"
        alt=""
      />
    </span>
  </div>
</template>

<script setup>
const emit = defineEmits();
const props = defineProps({
  canUndo: {
    type: Boolean,
    default() {
      return false;
    },
  },
  canDo: {
    type: Boolean,
    default() {
      return false;
    },
  },
});
</script>

<style lang="less" scoped>
.undo-component {
  z-index: 10;
  position: absolute;
  left: 15px;
  bottom: 0;
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