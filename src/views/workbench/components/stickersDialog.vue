<template>
  <div class="stickers-dialog">
    <Loading v-show="loadingFlag" />
    <var-tabs
      v-if="props.stickersShow"
      v-model:active="active"
      @change="tabChange"
    >
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
          :loading="$LoadingImage"
          :src="dealImageUrl(tab.stickerUrl)"
        />
      </var-tab>
    </var-tabs>
    <div class="window-close-icon">
      <var-icon name="window-close" @click="emit('close')" />
    </div>
    <div class="images-container" v-if="tabs[active]">
      <Loading v-show="listLoading" />
      <div
        class="single-image"
        v-for="(single, singleIndex) in tabs[active].children"
        :key="singleIndex"
        @click.stop="stickerClickHandler(single)"
      >
        <var-image
          v-if="props.stickersShow"
          width="40px"
          height="40px"
          lazy
          :loading="$LoadingImage"
          :src="dealImageUrl(single.url)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { getStickers, getStickerList } from "@/api/workbench.js";
import { dealImageUrl } from "@/utils";

const props = defineProps({
  stickersShow: {
    type: Boolean,
    default() {
      return false;
    },
  },
});

const emit = defineEmits();
onBeforeMount(() => {
  initDatas();
});
const active = ref(0);
const tabs = ref([]);
const loadingFlag = ref(false);
const initDatas = () => {
  loadingFlag.value = true;
  getStickers({
    offset: 0,
    pageSize: 500,
  })
    .then((res) => {
      if (res.code === 200) {
        tabs.value = res.data.sort((a, b) => a.id - b.id);
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
  getStickerList({
    id: tabs.value[index].id,
  })
    .then((res) => {
      if (res.code === 200) {
        tabs.value[index].children = res.data.stickerChildlist;
      }
    })
    .finally(() => {
      listLoading.value = false;
      tabs.value[index].hasLoad = true;
    });
};

const stickerClickHandler = (item) => {
  emit("stickerSelect", dealImageUrl(item.url));
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
    position: relative;
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
  .window-close-icon {
    position: absolute;
    right: 0;
    top: 0;
    height: 40px;
    width: 30px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ee50f3;
  }
  // active bar display none!
  :deep(.var-tabs__indicator) {
    display: none;
  }
  // scroll bar styles
  :deep(.var-tabs--layout-horizontal-scrollable::-webkit-scrollbar) {
    display: block !important;
  }
  :deep(.var-tabs__tab-wrap) {
    &::-webkit-scrollbar {
    }

    &::-webkit-scrollbar-thumb {
      min-width: 40px !important;
      background: #ee50f3;
      border-radius: 20px;
    }
  }
}
</style>
