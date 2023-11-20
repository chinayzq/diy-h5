<template>
  <div class="common-page common-mobile-component">
    <Loading v-show="pageLoading" />
    <CommonHeader style="padding: 0 20px;" />
    <div v-html="htmlContent" class="content-container"></div>
    <!-- 123 -->
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import CommonHeader from "@/components/CommonHeader/index.vue";
import { getArticleById } from "@/api/workbench";
const htmlContent = ref(``);

const route = useRoute();
const pageLoading = ref(false)
const initDatas = () => {
  const { id } = route.query;
  if (id) {
    htmlContent.value = "";
    pageLoading.value = true
    getArticleById(id).then((res) => {
      htmlContent.value = res.data.content;
    }).finally(() => {
      pageLoading.value = false
    })
  }
};
watch(
  () => route.path,
  () => {
    initDatas();
  },
  { immediate: true, deep: true }
);
</script>

<style lang="less" scoped>
.common-page {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background: #fff;
  // padding: 0 20px 30px;
  box-sizing: border-box;
  .content-container {
    padding: 20px;
    height: calc(100% - 90px);
    overflow: auto;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
}
</style>