<template>
  <div class="brand-and-models">
    <Loading v-show="loadingFlag" />
    <div class="brand-container">
      <div class="title-line">Brand</div>
      <div class="brand-list">
        <span
          :class="[
            'single-brand',
            index === activeBrandIndex && 'single-brand-active',
          ]"
          v-for="(item, index) in dataList"
          :key="index"
          @click="activeBrandIndex = index"
        >
          {{ item.brandName }}
        </span>
      </div>
    </div>
    <div class="model-container">
      <div class="title-line">Model</div>
      <div class="model-list" v-if="dataList[activeBrandIndex]">
        <span
          :class="[
            'single-model',
            modelIndex === activeModelIndex && 'single-model-active',
          ]"
          v-for="(model, modelIndex) in dataList[activeBrandIndex].modelList"
          :key="modelIndex"
          @click="modelClickHandler(model, modelIndex)"
        >
          {{ model.phoneName }}
        </span>
      </div>
    </div>
    <div class="case-container">
      <div class="title-line">Color</div>
      <div class="image-list">
        <var-image
          :class="[
            'single-image',
            activeCaseIndex === phoneIndex && 'single-image-active',
          ]"
          @click="activeCaseIndex = phoneIndex"
          v-for="(phoneItem, phoneIndex) in phoneColorList"
          :key="phoneIndex"
          height="77px"
          lazy
          loading="/src/assets/images/img_loading.svg"
          :src="dealImageUrl(phoneItem.url)"
        />
      </div>
    </div>
    <div class="next-step" @click="nextStepHandler">Next Step</div>
  </div>
</template>

<script setup>
import { getBrandAndModels, getPhoneColor } from "@/api/workbench";
import { onBeforeMount, ref } from "vue";
import { dealImageUrl } from "@/utils";
onBeforeMount(() => {
  initDatas();
});

const dataList = ref([]);
const loadingFlag = ref(false);
const initDatas = () => {
  loadingFlag.value = true;
  getBrandAndModels()
    .then((res) => {
      console.log(res);
      if (res.code === 200) {
        dataList.value = res.data;
      }
    })
    .finally(() => {
      loadingFlag.value = false;
    });
};

const activeBrandIndex = ref(0);
const activeModelIndex = ref(0);
const activeCaseIndex = ref(0);
const activePhoneName = ref(null);
const modelClickHandler = (model, index) => {
  activeModelIndex.value = index;
  activePhoneName.value = model.phoneName;
  getCaseByPhoneCode(model.phoneCode);
};

const phoneColorList = ref([]);
const caseList = ref([]);
const getCaseByPhoneCode = (phoneCode) => {
  getPhoneColor({
    phoneCode,
  }).then((res) => {
    if (res.code === 200) {
      phoneColorList.value = res.data.phoneColorList;
      caseList.value = res.data.modelColorList;
    }
  });
};

const emit = defineEmits();
const nextStepHandler = () => {
  emit("nextStep", {
    caseList: caseList.value,
    phoneName: activePhoneName.value,
  });
};
</script>

<style lang="less" scoped>
.brand-and-models {
  height: 90vh;
  width: 100vw;
  overflow: hidden auto;
  padding: 20px 10px;
  .title-line {
    height: 25px;
    line-height: 25px;
    font-family: JostMedium;
    font-size: 13px;
    color: #000000e6;
  }
  .brand-container {
    .brand-list {
      display: flex;
      gap: 0 10px;
      margin-top: 15px;
      padding-bottom: 10px;
      .single-brand {
        height: 30px;
        padding: 5px 10px;
        background-color: #f8f8f8;
        border: 2.5px solid #f8f8f8;
        border-radius: 5px;
      }
      .single-brand-active {
        border: 2.5px solid rgb(143, 191, 255);
      }
    }
  }
  .model-container {
    .model-list {
      display: flex;
      gap: 10px;
      margin-top: 15px;
      padding-bottom: 10px;
      flex-wrap: wrap;
      .single-model {
        height: 30px;
        padding: 5px 10px;
        background-color: #f8f8f8;
        border: 2.5px solid #f8f8f8;
        border-radius: 5px;
      }
      .single-model-active {
        border: 2.5px solid rgb(143, 191, 255);
      }
    }
  }
  .case-container {
    width: 100vw;
    .image-list {
      margin-top: 15px;
      display: flex;
      gap: 0 10px;
      padding-bottom: 10px;
      width: 100%;
      overflow: auto;
      .single-image {
        padding: 5px 10px;
        border: 2.5px solid #f8f8f8;
        min-width: 60px;
      }
      .single-image-active {
        border: 2.5px solid rgb(143, 191, 255);
      }
    }
  }
  .next-step {
    font-size: 16px;
    height: 46px;
    line-height: 46px;
    font-family: JostMedium;
    cursor: pointer;
    color: white;
    background-color: rgb(230, 50, 149);
    border-radius: 5px;
    text-align: center;
    margin-top: 30px;
  }
}
</style>