<template>
  <div class="brand-and-models">
    <Loading v-show="loadingFlag" />
    <var-icon
      class="close-icon"
      name="window-close"
      :size="30"
      @click="closeHandler"
      v-if="rightLocalStore"
    />
    <var-tabs v-model:active="active">
      <var-tab name="phoneCase">phoneCase</var-tab>
      <var-tab name="phoneSticker">phoneSticker</var-tab>
    </var-tabs>
    <div v-show="!loadingFlag && active === 'phoneCase'" class="main-container">
      <div class="sroll-container">
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
          </div>
          <!-- <span
            class="single-brand"
            style="margin: 15px 0; display: inline-block"
            @click="caseStickerSelect"
          >
            Case Sticker
          </span> -->
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
              :src="dealImageUrlNew(phoneItem.url)"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-show="!loadingFlag && active === 'phoneSticker'"
      class="main-container"
    >
      <div class="sroll-container">
        <div class="brand-container">
          <div class="title-line">Brand</div>
          <div class="brand-list">
            <span
              :class="[
                'single-brand',
                index === stickerBrandIndex && 'single-brand-active',
              ]"
              v-for="(item, index) in dataList2"
              :key="index"
              @click="stickerBrandIndex = index"
            >
              {{ item.brandName }}
            </span>
          </div>
          <!-- <span
            class="single-brand"
            style="margin: 15px 0; display: inline-block"
            @click="caseStickerSelect"
          >
            Case Sticker
          </span> -->
        </div>
        <div class="model-container">
          <div class="title-line">Model</div>
          <div class="model-list" v-if="dataList2[stickerBrandIndex]">
            <span
              :class="[
                'single-model',
                modelIndex === stickerModelIndex && 'single-model-active',
              ]"
              v-for="(model, modelIndex) in dataList2[stickerBrandIndex]
                .modelList"
              :key="modelIndex"
              @click="modelClickHandler(model, modelIndex)"
            >
              <!-- 手机壳贴纸测试 -->
              {{ model.phoneName }} sticker
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="next-step" @click="nextStepHandler">Next Step</div>
  </div>
</template>

<script setup>
import { getBrandAndModels, getPhoneColor } from "@/api/workbench";
import { onBeforeMount, ref, watch } from "vue";
import { dealImageUrlNew } from "@/utils";

const active = ref("phoneCase");
watch(
  () => active.value,
  (value) => {
    if (value === "phoneCase") {
      modelClickHandler(dataList.value[0].modelList[0], 0);
    } else {
      modelClickHandler(dataList2.value[0].modelList[0], 0);
    }
  }
);
const props = defineProps({
  rightLocalStore: {
    type: Boolean,
    default() {
      return true;
    },
  },
});

// 手机壳数据
const dataList = ref([]);
// 贴纸数据
const dataList2 = ref([]);
const loadingFlag = ref(false);
const initDatas = (type) => {
  // phoneCase | phoneSticker
  loadingFlag.value = true;
  getBrandAndModels({
    source: type === "phoneCase" ? 1 : 2,
  })
    .then((res) => {
      if (res.code === 200) {
        if (type === "phoneCase") {
          dataList.value = res.data;
          modelClickHandler(res.data[0].modelList[0], 0);
        } else if (type === "phoneSticker") {
          dataList2.value = res.data;
        }
      }
    })
    .finally(() => {
      loadingFlag.value = false;
    });
};
initDatas("phoneCase");
initDatas("phoneSticker");

const activeBrandIndex = ref(0);
const activeModelIndex = ref(0);
const activeCaseIndex = ref(0);
const stickerBrandIndex = ref(0);
const stickerModelIndex = ref(0);
const activePhoneName = ref(null);
const activePhoneCode = ref(null);
const modelClickHandler = (model, index) => {
  stickerModelIndex.value = index;
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
    source: active.value === "phoneCase" ? 1 : 2,
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
  if (active.value === "phoneCase") {
    const brandName = dataList.value[activeBrandIndex.value].brandName;
    const modelUrl = phoneColorList.value[activeCaseIndex.value].url;
    const maskUrl = maskList.value[0].url;
    const printAdjust = printImage.value[0];
    emit("nextStep", {
      source: active.value === "phoneCase" ? 1 : 2,
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
  } else {
    const brandName = dataList2.value[activeBrandIndex.value].brandName;
    // 暂时不需要手机壳和机型底图
    // const modelUrl = phoneColorList.value[activeCaseIndex.value].url;
    // const maskUrl = maskList.value[0].url;
    const modelUrl = null;
    const maskUrl = null;
    emit("nextStep", {
      source: active.value === "phoneCase" ? 1 : 2,
      caseList: caseList.value, // 贴纸列表
      phoneName: activePhoneName.value, // 机型名称
      phoneCode: activePhoneCode.value, // 机型Code
      modelUrl, // 机型背景图
      brandName, // 品牌名称
      maskUrl, // 手机壳背景图
    });
  }
};

// const caseStickerSelect = () => {
//   emit("caseStickerNext");
// };

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
    height: calc(100% - 120px);
    overflow: auto;
    .sroll-container {
      flex: 1;
      overflow: auto;
    }
  }
  .brand-container {
    .single-brand {
      height: 30px;
      padding: 5px 10px;
      background-color: #f8f8f8;
      border: 2.5px solid #f8f8f8;
      border-radius: 5px;
    }
    .brand-list {
      display: flex;
      gap: 0 10px;
      margin-top: 15px;
      padding-bottom: 10px;
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
