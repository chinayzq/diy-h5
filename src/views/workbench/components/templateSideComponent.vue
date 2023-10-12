<template>
  <div class="template-side-component" v-if="store.client === 'PC'">
    <div class="template-header">Template</div>
    <var-collapse
      v-model="active"
      accordion
      :offset="false"
      @change="tabChange"
    >
      <var-collapse-item
        :title="tab.typeName"
        v-for="(tab, index) in tabs"
        :key="index"
      >
        <div class="template-list" v-if="index === active">
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
          </div>
        </div>
      </var-collapse-item>
    </var-collapse>
  </div>
</template>

<script setup>
import { useStore } from "@/stores";
import { ref, onBeforeMount } from "vue";
import { getTemplateTypeList, getTemplateListByCode } from "@/api/workbench";

onBeforeMount(() => {
  initDatas();
});

const store = useStore();

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

const emit = defineEmits();
const templateClickHandler = (template) => {
  emit("templateChange", template.templateId);
};
</script>

<style lang="less" scoped>
.template-side-component {
  width: 300px;
  height: 100vh;
  position: fixed;
  right: 0;
  top: 0;
  .template-header {
    background: #fff;
    // border-left: 1px solid #e6e9ef;
    height: 36px;
    padding-left: 36px;
    line-height: 36px;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.9);
    font-family: JostMedium;
    box-shadow: 0 0.8rem 0.26667rem -0.53333rem var(--shadow-key-umbra-opacity),
      0 0.53333rem 0.53333rem 0 var(--shadow-key-penumbra-opacity),
      0 0.26667rem 1.33333rem 0 var(--shadow-key-ambient-opacity);
    &::before {
      content: "";
      position: absolute;
      left: 4px;
      top: 4px;
      width: 28px;
      height: 28px;
      background-image: url(../../../assets/images/home_bar_templates.svg);
      background-size: 100% 100%;
    }
  }
  .template-list {
    height: 300px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: space-evenly;
    .single-image {
      width: 120px;
    }
  }
  :deep(.var-collapse) {
    height: 100%;
    overflow: auto;
  }
  :deep(.var-collapse-item__header) {
    cursor: pointer;
  }
}
</style>