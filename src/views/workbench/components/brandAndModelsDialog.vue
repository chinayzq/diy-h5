<template>
  <div class="brand-and-models">
    <Loading v-show="loadingFlag" />
    <var-icon
      class="close-icon"
      name="window-close"
      :size="30"
      @click="closeHandler"
    />
    <div v-show="!loadingFlag" class="main-container">
      <div class="sroll-container">
        <div style="font-size: 10px; color: #000; margin-bottom: 15px">
          only sale phone cases and not original products, only adapters.
        </div>
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
              {{ item.brandName }} case
            </span>
            <span class="single-brand" @click="caseStickerSelect">
              Case Sticker
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
              v-for="(model, modelIndex) in dataList[activeBrandIndex]
                .modelList"
              :key="modelIndex"
              @click="modelClickHandler(model, modelIndex)"
            >
              <!-- 手机壳贴纸测试 -->
              {{ model.phoneName }} case
            </span>
          </div>
        </div>
        <div class="case-container">
          <div class="title-line">Color</div>
          <div class="image-list">
            <Loading v-show="listLoading" />
            <var-image
              :class="[
                'single-image',
                activeCaseIndex === phoneIndex && 'single-image-active',
              ]"
              @click="activeCaseIndex = phoneIndex"
              v-for="(phoneItem, phoneIndex) in phoneColorList"
              :key="phoneIndex"
              lazy
              :loading="$LoadingImage"
              :src="dealImageUrl(phoneItem.url)"
            />
          </div>
        </div>
      </div>
      <div class="next-step" @click="nextStepHandler">Next Step</div>
    </div>
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
        modelClickHandler(res.data[0].modelList[0], 0);
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
const activePhoneCode = ref(null);
const modelClickHandler = (model, index) => {
  activeModelIndex.value = index;
  activePhoneName.value = model.phoneName;
  activePhoneCode.value = model.phoneCode;
  getCaseByPhoneCode(model.phoneCode);
};

const phoneColorList = ref([]);
const caseList = ref([]);
const maskList = ref([]);
const printImage = ref([]);
const listLoading = ref(false);
const getCaseByPhoneCode = (phoneCode) => {
  listLoading.value = true;
  getPhoneColor({
    phoneCode,
  })
    .then((res) => {
      if (res.code === 200) {
        phoneColorList.value = res.data.phoneColorList;
        caseList.value = res.data.modelColorList;
        maskList.value = res.data.maskImage;
        printImage.value = res.data.printImage || [{}];
      }
    })
    .finally(() => {
      listLoading.value = false;
    });
};

const emit = defineEmits();
const nextStepHandler = () => {
  const brandName = dataList.value[activeBrandIndex.value].brandName;
  const modelUrl = phoneColorList.value[activeCaseIndex.value].url;
  const maskUrl = maskList.value[0].url;
  const printAdjust = printImage.value[0];
  emit("nextStep", {
    caseList: caseList.value, //手机壳列表&example列表
    phoneName: activePhoneName.value, // 机型名称
    phoneCode: activePhoneCode.value, // 机型Code
    modelUrl, // 机型背景图
    brandName, // 品牌名称
    maskUrl, // 蒙版背景图
    printAdjust: {
      // 打印调整
      width: printAdjust.extend1 || null,
      height: printAdjust.extend2 || null,
    },
  });
};

const caseStickerSelect = () => {
  emit("caseStickerNext");
};

const closeHandler = () => {
  emit("close");
};
</script>

<style lang="less" scoped>
.brand-and-models {
  height: 80vh;
  width: 100%;
  overflow: hidden;
  padding: 20px 10px;
  position: relative;
  .close-icon {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .title-line {
    height: 25px;
    line-height: 25px;
    font-family: "JostMedium";
    font-size: 13px;
    color: #000000e6;
  }
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    overflow: auto;
    .sroll-container {
      flex: 1;
      overflow: auto;
    }
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
    width: 100%;
    .image-list {
      margin-top: 15px;
      display: flex;
      gap: 0 10px;
      padding-bottom: 10px;
      width: 100%;
      overflow: auto;
      min-height: 120px;
      position: relative;
      .single-image {
        padding: 5px 10px;
        border: 2.5px solid #f8f8f8;
        min-width: 75px;
        max-width: 75px;
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
    font-family: "JostMedium";
    cursor: pointer;
    color: white;
    background-color: rgb(230, 50, 149);
    border-radius: 5px;
    text-align: center;
    margin-top: 30px;
  }
}
</style>
