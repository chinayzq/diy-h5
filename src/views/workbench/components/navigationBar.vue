<template>
  <div class="navigation-bar-component">
    <div
      class="single-item"
      @mouseup.stop="itemClickHandler(item.key)"
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
import { judgeClient, dealImageUrl } from "@/utils";
import { uploadImageRequest } from "@/utils/domToImage.js";
import { ref, watch } from "vue";
// import { uploadImage } from "@/api/workbench";
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

const getImageSize = (file) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsDataURL(file.file);
    reader.onload = (e) => {
      const img = e.target.result;
      const image = new Image();
      image.src = img;

      image.onload = (_) => {
        let width = image.width;
        let height = image.height;
        console.log("width, height", width, height);
        const imageHeight = (100 / width) * height;
        resolve(imageHeight);
        // 然后就可以做需要的操作了
      };
    };
  });
};

const uploadSuccess = async (file) => {
  console.log("file", file);
  const imageHeight = await getImageSize(file);
  emit("loadingChange", true);
  const imageUrl = await uploadImageRequest(file.file);
  if (activeCountRef.value === 0) {
    emit("naviClick", "image", dealImageUrl(imageUrl), imageHeight);
  } else {
    emit("naviClick", "imageReplace", dealImageUrl(imageUrl));
  }
  emit("loadingChange", false);
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
