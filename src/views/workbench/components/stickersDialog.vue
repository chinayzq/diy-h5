<template>
  <div class="stickers-dialog">
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
          loading="/src/assets/images/img_loading.svg"
          :src="dealImageUrl(tab.stickerUrl)"
        />
      </var-tab>
      <var-icon name="window-close" @click="emit('close')" />
    </var-tabs>
    <keep-alive>
      <div class="images-container" v-if="tabs[active]">
        <div
          class="single-image"
          v-for="(single, singleIndex) in tabs[active].stickerChildlist"
          :key="singleIndex"
        >
          <var-image
            width="40px"
            height="40px"
            lazy
            loading="/src/assets/images/img_loading.svg"
            :src="dealImageUrl(single.url)"
          />
        </div>
      </div>
    </keep-alive>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { getStickers } from "@/api/workbench.js";
import { dealImageUrl } from "@/utils";
const emit = defineEmits();
onBeforeMount(() => {
  initDatas();
});
const active = ref(0);
const tabs = ref([]);
const initDatas = () => {
  getStickers().then((res) => {
    console.log(res);
    if (res.code === 200) {
      tabs.value = res.data;
    }
  });
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