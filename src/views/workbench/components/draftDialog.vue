<template>
  <div class="draft-dialog">
    <div class="title-line">
      <span class="title-span">My Unfinished Masterpieces</span>
      <var-icon
        class="close-icon"
        name="window-close"
        :size="30"
        @click="closeHandler"
      />
    </div>
    <div class="draft-list">
      <div class="single-draft" @click="emit('close')">
        <div class="icon-container">
          <img src="@/assets/images/drafts_add_button.png" alt="" />
        </div>
        <div class="background-container"></div>
      </div>
      <div class="single-draft" v-for="(item, index) in draftList" :key="index">
        {{ item.label }}
        <div class="background-container">
          {{ item.time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits();
const closeHandler = () => {
  emit("close");
};

const draftList = ref([
  {
    time: "2023-10-12 03:05:55",
  },
  {},
  {},
  {},
  {},
  {},
]);
</script>

<style lang="less" scoped>
.draft-dialog {
  height: 500px;
  width: 100%;
  padding: 15px 10px 15px 15px;
  .title-line {
    position: relative;
    text-align: center;
    margin: 10px 0 40px;
    .title-span {
      font-family: "JostMedium";
      font-size: 18px;
      font-style: normal;
    }
    .close-icon {
      position: absolute;
      right: 5px;
      top: -10px;
    }
  }
  .draft-list {
    width: 100%;
    height: 450px;
    overflow: auto hidden;
    display: flex;
    flex-wrap: wrap;
    gap: 10px 20px;
    justify-content: space-between;
    .single-draft {
      width: calc(50% - 10px);
      min-height: 200px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-container {
        width: 70%;
        height: 100%;
        border-radius: 25px;
        background-color: #f8f5ed;
        display: flex;
        justify-content: center;
        align-items: center;
        & > img {
          width: 70%;
        }
      }
      .background-container {
        width: 100%;
        height: 15%;
        position: absolute;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(#00000010, #00000060);
        color: #fff;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>