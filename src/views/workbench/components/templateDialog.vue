<template>
  <div :class="['template-dialog', `template-dialog-${displayModel}`]">
    <div class="left-part" v-show="displayModel === 'default'">
      <img class="clear-icon" src="@/assets/images/template_clear.svg" alt="" />
      <span class="more-span" @click="changeHandler">
        M
        <br />
        O
        <br />
        R
        <br />
        E
      </span>
    </div>
    <div :class="['right-part', `right-part-${displayModel}`]">
      <var-tabs v-model:active="active" @change="tabChange" style="width: 100%">
        <var-tab
          v-for="(tab, index) in tabs"
          :key="tab.src"
          color="var(--color-primary)"
          active-color="#fff"
          inactive-color="hsla(0, 0%, 100%, .6)"
        >
          <span :class="['tab-label', index === active && 'tab-label-active']">
            {{ tab.typeName }}
          </span>
        </var-tab>
      </var-tabs>
      <div class="template-list">
        <div
          class="single-image"
          v-for="(single, singleIndex) in tabs[active]?.children"
          :key="singleIndex"
        >
          <var-image
            lazy
            loading="/src/assets/images/img_loading.svg"
            :src="single.templateUrl"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { getTemplateTypeList, getTemplateListByCode } from "@/api/workbench";

onBeforeMount(() => {
  initDatas();
});

// default: 200, more:610
const displayModel = ref("default");

const emit = defineEmits();
const changeHandler = () => {
  displayModel.value = "more";
  emit("change");
};

const active = ref(0);
const tabs = ref([]);
const loadingFlag = ref(false);
const initDatas = () => {
  loadingFlag.value = true;
  getTemplateTypeList()
    .then((res) => {
      if (res.code === 200) {
        tabs.value = res.data;
      }
    })
    .finally(() => {
      loadingFlag.value = false;
    });
};

const listLoading = ref(false);
const tabChange = (index) => {
  if (tabs.value[index] && tabs.value[index].hasLoad) {
    return;
  }
  listLoading.value = true;
  getTemplateListByCode({
    offset: 0,
    pageSize: 100,
    typeCode: tabs.value[index].typeCode,
  })
    .then((res) => {
      if (res.code === 200) {
        tabs.value[index].children = res.data;
      }
    })
    .finally(() => {
      listLoading.value = false;
      tabs.value[index].hasLoad = true;
    });
};
</script>

<style lang="less" scoped>
.template-dialog {
  width: 100vw;
  display: flex;
  .left-part {
    min-width: 45px;
    height: 100%;
    display: flex;
    flex-direction: column;
    .clear-icon {
      height: 28px;
      width: 28px;
      cursor: pointer;
      margin: 10px;
    }
    .more-span {
      font-size: 16px;
      font-family: JostMedium;
      background-color: #f7f7f7;
      flex: 1;
      text-align: center;
      padding-top: 10px;
    }
  }
  .right-part {
    height: 100%;
    .tab-label {
      font-size: 16px;
      font-family: JostMedium;
      color: rgb(137, 137, 137);
    }
    .tab-label-active {
      color: rgb(51, 51, 51);
    }
    .template-list {
      width: 100%;
      height: calc(100% - 48px);
      display: flex;
      gap: 0 10px;
      .single-image {
        width: 80px;
        height: 106px;
        display: inline-block;
      }
    }
  }
  .right-part-default {
    width: calc(100% - 45px);
  }
  .right-part-more {
    width: 100%;
  }
}
.template-dialog-default {
  height: 200px;
}
.template-dialog-more {
  height: 610px;
}
</style>