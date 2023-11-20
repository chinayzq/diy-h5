<template>
  <div class="common-page common-mobile-component">
    <CommonHeader />
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
const initDatas = () => {
  const { id } = route.query;
  if (id) {
    htmlContent.value = "";
    getArticleById(id).then((res) => {
      htmlContent.value = res.data.content;
    });
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
  padding: 0 20px 30px;
  box-sizing: border-box;
  .content-container {
    padding: 20px 0;
  }
}
</style>