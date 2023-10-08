<template>
  <div class="brand-and-models">
    <div class="brand-container">
      <div class="title-line">Brand</div>
    </div>
    <div class="model-container">
      <div class="title-line">Model</div>
    </div>
  </div>
</template>

<script setup>
console.log(111);
</script>

<style lang="less" scoped>
.brand-and-models {
  height: 90vh;
  width: 100%;
  padding: 20px 10px;
  .title-line {
    height: 25px;
    line-height: 25px;
    font-family: JostMedium;
    font-size: 14px;
    color: #00000090;
  }
}
</style>