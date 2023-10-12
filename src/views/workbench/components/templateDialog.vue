<template>
  <div :class="['template-dialog', `template-dialog-${displayModel}`]">
    <Loading v-show="loadingFlag" />
    <div class="left-part" v-show="displayModel === 'default'">
      <img
        class="clear-icon"
        @click="emit('clear')"
        src="@/assets/images/template_clear.svg"
        alt=""
      />
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
        <Loading v-show="listLoading" />
        <div
          class="single-image"
          v-for="(single, singleIndex) in tabs[active]?.children"
          :key="singleIndex"
          @click="templateClickHandler(single)"
        >
          <var-image
            lazy
            loading="/src/assets/images/img_loading.svg"
            :src="`${single.templateUrl}?type=webp`"
          />
          <span class="diy-span" v-show="!listLoading">diy it</span>
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
      tabChange(0);
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

const templateClickHandler = (template) => {
  emit("clear");
  emit("templateChange", template.templateId);
};
</script>

<style lang="less" scoped>
.template-dialog {
  width: 100vw;
  display: flex;
  position: relative;
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
  }
  .right-part-default {
    width: calc(100% - 45px);
    .template-list {
      width: 100%;
      height: calc(100% - 48px);
      overflow: auto;
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 0 10px;
      position: relative;
      .single-image {
        width: 70px;
        min-width: 70px;
        height: 116px;
        display: inline-block;
        :deep(.var-image) {
          height: 100%;
          width: 100%;
        }
        .diy-span {
          display: none;
        }
      }
    }
  }
  .right-part-more {
    width: 100%;
    .template-list {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      // justify-content: space-evenly;
      gap: 15px;
      padding: 20px 10px;
      height: calc(100% - 50px);
      overflow: auto;
      .single-image {
        background-color: #f7f7f7;
        width: 165px;
        min-height: 256px;
        display: inline-block;
        padding: 15px 0;
        position: relative;
        .diy-span {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background-color: #fff;
          text-align: center;
          color: #e73295;
          border-radius: 15px;
          font-family: JostMedium;
          font-size: 16px;
          display: inline-block;
          padding: 0 15px;
        }
        :deep(.var-image) {
          display: flex;
          justify-content: center;
        }
        :deep(.var-image__image) {
          width: 70%;
        }
      }
    }
  }
}
.template-dialog-default {
  height: 200px;
}
.template-dialog-more {
  height: 610px;
}
</style>