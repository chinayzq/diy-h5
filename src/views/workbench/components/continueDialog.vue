<template>
  <div class="continue-dialog" @click.stop>
    <div class="content-line">
      <div class="notice-line">Edit Notice</div>
      <div class="notice-line">Restore Edit</div>
    </div>
    <div class="button-line">
      <div class="undo button" @click.stop="emit('clickEvent', 'undo')">
        Undo
      </div>
      <div class="continue button" @click.stop="emit('clickEvent', 'continue')">
        Continue Edit
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits();
</script>

<style lang="less" scoped>
.continue-dialog {
  width: 250px;
  background: #ffffff;
  height: 130px;
  .content-line {
    border-bottom: 1px solid #ccc;
    font-size: 12px;
    color: #999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 80px;
  }
  .button-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    .button {
      flex: 1;
      cursor: pointer;
      font-size: 16px;
      color: #000000;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .continue {
      color: rgb(0, 122, 255);
      border-left: 1px solid #ccc;
    }
  }
}
</style>