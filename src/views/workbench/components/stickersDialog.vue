<template>
  <div class="stickers-dialog">
    <Loading v-show="loadingFlag" />
    <var-tabs v-model:active="active" style="width: 100vw">
      <var-tab
        v-for="tab in tabs"
        :key="tab.src"
        color="var(--color-primary)"
        active-color="#fff"
        inactive-color="hsla(0, 0%, 100%, .6)"
      >
        <var-image
          width="30px"
          height="30px"
          lazy
          loading="/src/assets/images/load.gif"
          :src="tab.stickerUrl"
        />
      </var-tab>
      <var-icon name="window-close" @click="emit('close')" />
    </var-tabs>
    <div class="images-container" v-if="tabs[active]">
      <div
        class="single-image"
        v-for="(single, singleIndex) in tabs[active].stickerChildlist"
        :key="singleIndex"
        @click="stickerClickHandler(single)"
      >
        <var-image
          width="40px"
          height="40px"
          lazy
          loading="/src/assets/images/load.gif"
          :src="single.url"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { getStickers } from "@/api/workbench.js";
const emit = defineEmits();
onBeforeMount(() => {
  initDatas();
});
const active = ref(0);
const tabs = ref([]);
const loadingFlag = ref(false);
const initDatas = () => {
  loadingFlag.value = true;
  getStickers()
    .then((res) => {
      console.log(res);
      if (res.code === 200) {
        tabs.value = res.data.slice(0, 10);
      }
    })
    .finally(() => {
      loadingFlag.value = false;
    });
};

const stickerClickHandler = (item) => {
  emit("stickerSelect", item.url);
};
</script>

<style lang="less" scoped>
.stickers-dialog {
  height: 275px;
  width: 100%;
  overflow: hidden;
  .images-container {
    height: calc(100% - 50px);
    overflow: hidden auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 8px;
    padding-left: 8px;
    padding-top: 10px;
    .single-image {
      background-color: #f7f7f7;
      cursor: pointer;
      height: 80px;
      width: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>