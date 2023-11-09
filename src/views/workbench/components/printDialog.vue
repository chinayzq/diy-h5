<template>
  <div class="print-dialog">
    <div class="title-line">
      <span class="title-span"> Preview </span>
      <var-icon
        class="close-icon"
        name="window-close"
        :size="30"
        @click="closeHandler"
      />
    </div>
    <div class="graph-container">
      <img
        v-if="!previewImage"
        class="loading-icon"
        src="@/assets/images/preview-loading.gif"
        alt=""
      />
      <var-image
        v-else
        class="preview-image"
        :src="`/colgifts/image/${previewImage}?type=webp`"
        :loading="$LoadingImage"
        alt=""
      />
    </div>
    <div class="model-line">
      {{ selectPhoneName }}
    </div>
    <div class="confirm-button" @click="confirmHandler">CONFIRM</div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  previewImage: {
    type: String,
    default() {
      return "";
    },
  },
  confirmLoading: {
    type: Boolean,
    default() {
      return false;
    },
  },
  selectPhoneName: {
    type: String,
    default() {
      return "IPhone 14";
    },
  },
});
const emit = defineEmits();
const closeHandler = () => {
  emit("close");
};
const confirmHandler = () => {
  if (props.confirmLoading.value) return;
  emit("confirm");
};
</script>

<style lang="less" scoped>
.print-dialog {
  width: 100%;
  height: 560px;
  padding: 15px 10px;
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
  .graph-container {
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    .loading-icon {
      height: 80px;
      width: 220px;
    }
    .preview-image {
      // height: 80%;
      // width: 180px;
      // height: 353px;
      width: 50%;
    }
  }
  .model-line {
    text-align: center;
    font-family: "JostMedium";
    font-size: 16px;
    font-style: normal;
    color: rgba(0, 0, 0, 0.9);
    margin-bottom: 8px;
  }
  .confirm-button {
    height: 46px;
    line-height: 46px;
    text-align: center;
    border-radius: 5px;
    font-family: "JostMedium";
    font-size: 18px;
    color: rgb(255, 255, 255);
    background-color: rgb(0, 0, 0);
    cursor: pointer;
  }
}
</style>