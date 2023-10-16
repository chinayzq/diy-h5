<template>
  <div class="test-component">
    <div class="test1"></div>
    <div cklas="test3"></div>
    <div class="test2"></div>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.test-component {
  position: absolute;
  left: 0;
  top: 0;
  background: lightgray;
  height: 100%;
  // height: calc(100vh - constant(safe-area-inset-bottom));
  // height: calc(100vh - env(safe-area-inset-bottom));
  // height: calc(
  //   100vh - 105px - constant(safe-area-inset-top) -
  //     constant(safe-area-inset-bottom)
  // );
  // height: calc(
  //   100vh - 105px - env(safe-area-inset-top) - env(safe-area-inset-bottom)
  // );
  // padding-bottom: constant(safe-area-inset-bottom);
  // padding-bottom: env(safe-area-inset-bottom);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .test3 {
    width: 100%;
    // height: calc(constant(safe-area-inset-bottom) + 10px);
    // height: calc(env(safe-area-inset-bottom) + 10px);
    background: #ffff00;
  }
  .test1 {
    height: 100px;
    width: 100%;
    background: lightblue;
  }
  .test2 {
    height: 100px;
    width: 100%;
    background: lightcoral;
  }
}
</style>