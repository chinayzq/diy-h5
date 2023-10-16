<template>
  <div class="navigation-bar-component">
    <div
      class="single-item"
      @click.stop="itemClickHandler(item.key)"
      v-for="item in activeItems"
      :key="item.key"
    >
      <var-uploader
        v-if="item.key === 'image' && activeType !== 'text'"
        @after-read="uploadSuccess"
        hide-list
        v-model="files"
        style="width: 35px"
      >
        <!-- ↑↑↑  需要设置一个具体数值,否则在IOS中，宽度巨大 -->
        <div :class="['icon-line', `icon-${item.key}`]"></div>
        <div class="name-line">
          {{ item.label }}
        </div>
      </var-uploader>
      <template v-else>
        <div :class="['icon-line', `icon-${item.key}`]"></div>
        <div class="name-line">
          {{ item.label }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { judgeClient } from "@/utils";
import { ref, watch } from "vue";

const files = ref([]);
const activeItems = ref([]);
const resourceItems = ref([
  {
    label: "Stickers",
    key: "stickers",
    activeTab: false,
  },
  {
    label: "Font",
    key: "font",
    activeTab: false,
  },
  {
    label: "Image",
    key: "image",
  },
  {
    label: "Templates",
    key: "templates",
    activeTab: false,
  },
  {
    label: "Layers",
    key: "layers",
    activeTab: true,
  },
  {
    label: "Flip",
    key: "flip",
    activeTab: true,
  },
]);
const currentClient = judgeClient();
if (currentClient === "PC") {
  resourceItems.value = resourceItems.value.filter(
    (item) => item.key !== "templates"
  );
}

const emit = defineEmits();
const itemClickHandler = (key) => {
  emit("naviClick", key);
};

const uploadSuccess = (file) => {
  if (activeCountRef.value === 0) {
    emit("naviClick", "image", file.cover);
  } else {
    emit("naviClick", "imageReplace", file.cover);
  }
};

const props = defineProps({
  dragStickerList: {
    type: Array,
    default() {
      return [];
    },
  },
});
const activeCountRef = ref(0);
const activeType = ref(null);
watch(
  () => props.dragStickerList,
  (list) => {
    const activeList = list.filter((item) => item.active);
    const activeCount = activeList.length;
    activeType.value = activeList[0]?.type || null;
    activeCountRef.value = activeCount;
    activeItems.value = resourceItems.value.filter((item) => {
      if (activeCount === 1) {
        return (
          item.activeTab ||
          (activeType.value !== "text" && item.key === "image")
        );
      } else {
        return !item.activeTab;
      }
    });
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>

<style lang="less" scoped>
.navigation-bar-component {
  width: 100%;
  height: 80px;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  .single-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon-line {
      width: 35px;
      height: 35px;
      margin-bottom: 6px;
    }
    .name-line {
      color: #5c5c66;
      font-size: 12px;
    }
  }
  .icon-stickers {
    background: url("../../../assets/images/home_bar_stickers.png");
    background-size: 100% 100%;
  }
  .icon-font {
    background: url("../../../assets/images/home_bar_font.png");
    background-size: 100% 100%;
  }
  .icon-image {
    background: url("../../../assets/images/home_bar_image.png");
    background-size: 100% 100%;
  }
  .icon-templates {
    background: url("../../../assets/images/home_bar_templates.png");
    background-size: 100% 100%;
  }
  .icon-layers {
    background: url("../../../assets/images/layer-icon.png");
    background-size: 100% 100%;
  }
  .icon-flip {
    background: url("../../../assets/images/home_bar_flip.png");
    background-size: 100% 100%;
  }
}
</style>
