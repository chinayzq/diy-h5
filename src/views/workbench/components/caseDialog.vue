<template>
  <div class="phone-case-dialog">
    <div class="title-line">
      <span> Phone Model: {{ selectPhoneName }} </span>
      <img
        @click="changeHandler"
        class="change-icon"
        src="@/assets/images/model_change_icon.png"
        alt=""
      />
    </div>
    <div class="scroll-container">
      <div class="single-card" v-for="(item, index) in dataset" :key="index">
        <var-image
          class="case-image"
          width="80px"
          lazy
          loading="/src/assets/images/img_loading.svg"
          :src="dealImageUrl(item.url)"
        />
        <div class="right-part">
          <span class="top-line">
            <div class="case-name-line">
              {{ item.colorName }}
            </div>
            <span class="size-camera-line">
              <span>
                {{ item.extend1 }}
              </span>
            </span>
            <span class="size-camera-line">
              <span>
                {{ item.extend2 }}
              </span>
            </span>
          </span>
          <div class="price-line">
            <span>
              <span class="oriPrice-span">
                {{ item.oriPrice + priceUnit }}
              </span>
              <span class="curPrice-span">
                {{ item.curPrice + priceUnit }}
              </span>
            </span>
            <span class="diy-span"> diy it > </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { dealImageUrl } from "@/utils";
import { ref } from "vue";
const props = defineProps({
  dataset: {
    type: Array,
    default() {
      return [];
    },
  },
  selectPhoneName: {
    type: String,
    default() {
      return [];
    },
  },
});
const priceUnit = ref("USD");

const emit = defineEmits();
const changeHandler = () => {
  emit("openModelDialog");
};
</script>

<style lang="less" scoped>
.phone-case-dialog {
  height: 85vh;
  padding: 15px;
  .title-line {
    padding-top: 10px;
    height: 35px;
    font-size: 14px;
    font-weight: 700;
    color: #000;
    font-family: JostMedium;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .change-icon {
      height: 30px;
      width: 30px;
      cursor: pointer;
      margin-left: 10px;
    }
  }
  .scroll-container {
    height: calc(100% - 60px);
    overflow: hidden auto;
    padding-right: 5px;
    .single-card {
      padding: 15px;
      width: 100%;
      height: 162px;
      margin-top: 10px;
      border-radius: 16px;
      background-color: #f8f8f8;
      border: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      .case-image {
        min-width: 80px;
      }
      .right-part {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .top-line {
          display: flex;
          flex-direction: column;
          .case-name-line {
            font-style: italic;
            font-family: JostMedium;
            font-size: 15px;
            color: #000;
            font-weight: 700;
          }
          .size-camera-line {
            font-style: normal;
            font-family: JostMedium;
            font-size: 12px;
            color: #000;
            margin-top: 10px;
            span {
              border: 1px solid #ddd;
              border-radius: 20px;
              padding: 0 10px;
            }
          }
        }

        .price-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 700;
          .oriPrice-span {
            text-decoration: line-through;
            color: #888;
            font-size: 13px;
          }
          .curPrice-span {
            color: #e63295;
            font-size: 13px;
            margin-left: 5px;
          }
          .diy-span {
            color: #e63295;
            font-size: 13px;
          }
        }
      }
    }
  }
}
</style>