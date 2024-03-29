<template>
  <div class="font-dialog">
    <Loading v-show="loadingFlag" />
    <div class="input-line">
      <var-input
        class="type-input"
        placeholder="Type here"
        v-model="typeContent"
        @input="inputChange"
      />
      <var-icon
        class="check-icon"
        @click="emit('close')"
        :size="26"
        name="check"
      />
    </div>
    <div class="tabs-line">
      <span
        @click="setTabActive(tab)"
        v-for="tab in tabs"
        :key="tab.label"
        :class="['single-tab', activeTab === tab.label && 'single-tab-active']"
      >
        {{ tab.label }}
      </span>
    </div>
    <div class="image-scroll" v-show="activeTab === 'Font'">
      <div class="images-container">
        <div
          class="single-image"
          v-for="(single, singleIndex) in fontSizeList"
          :key="singleIndex"
          @click="fontFamilyClick(single)"
        >
          <var-image
            width="40px"
            height="40px"
            lazy
            :loading="$LoadingImage"
            :src="dealImageUrlNew(single.extend2)"
          />
        </div>
      </div>
    </div>
    <div v-show="activeTab === 'Style'" class="style-container">
      <div class="color-list">
        <span
          class="single-color"
          :style="{
            backgroundColor: single,
          }"
          v-for="single in colorList"
          :key="single"
          @click="colorChange(single)"
        >
        </span>
      </div>
      <div class="style-list">
        <var-image
          v-for="item in fontIconList"
          :key="item.icon"
          width="30px"
          height="30px"
          lazy
          :loading="$LoadingImage"
          :src="getAssetsFile(item.icon)"
          @click="styleChange(item)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { getFontSize } from "@/api/workbench";
import { getAssetsFile, dealImageUrlNew } from "@/utils";

onBeforeMount(() => {
  initDatas();
});

const props = defineProps({
  editItem: {
    type: Object,
    default() {
      return {};
    },
  },
});

watch(
  () => props.editItem,
  (item) => {
    console.log("xxx1", item);
    typeContent.value = item.content;
  }
);

const colorList = [
  "rgb(255, 255, 255)",
  "rgb(0, 0, 0)",
  "rgb(163, 163, 163)",
  "rgb(231, 50, 149)",
  "rgb(244, 2, 85)",
  "rgb(235, 29, 101)",
  "rgb(255, 140, 162)",
  "rgb(253, 204, 196)",
  "rgb(128, 2, 255)",
  "rgb(148, 60, 253)",
  "rgb(151, 101, 255)",
  "rgb(193, 148, 253)",
  "rgb(242, 201, 255)",
  "rgb(50, 78, 254)",
  "rgb(64, 128, 255)",
  "rgb(56, 192, 255)",
  "rgb(127, 217, 255)",
  "rgb(187, 234, 255)",
  "rgb(90, 156, 35)",
  "rgb(133, 210, 40)",
  "rgb(167, 231, 96)",
  "rgb(200, 240, 149)",
  "rgb(2, 212, 159)",
  "rgb(165, 254, 233)",
  "rgb(228, 68, 12)",
  "rgb(255, 128, 0)",
  "rgb(244, 152, 5)",
  "rgb(255, 200, 10)",
  "rgb(255, 235, 181)",
  "rgb(45, 61, 78)",
  "rgb(97, 118, 140)",
  "rgb(145, 158, 176)",
  "rgb(207, 214, 220)",
  "rgb(239, 239, 239)",
  "rgb(97, 95, 99)",
  "rgb(160, 158, 158)",
  "rgb(214, 213, 215)",
  "rgb(239, 237, 241)",
];
const fontIconList = ref([
  {
    icon: "text-edit-align-left.svg",
    key: "align-left",
  },
  {
    icon: "text-edit-align-center.svg",
    key: "align-center",
  },
  {
    icon: "text-edit-align-right.svg",
    key: "align-right",
  },
  {
    icon: "text-edit-bold.svg",
    key: "bold",
  },
  {
    icon: "text-edit-italic.svg",
    key: "italic",
  },
  {
    icon: "text-edit-line-through.svg",
    key: "line-through",
  },
]);

const fontSizeList = ref([]);
const loadingFlag = ref(false);
const initDatas = () => {
  loadingFlag.value = true;
  getFontSize()
    .then((res) => {
      if (res.code === 200) {
        fontSizeList.value = res.data;
      }
    })
    .finally(() => {
      loadingFlag.value = false;
    });
};

const typeContent = ref(null);

const tabs = ref([
  {
    label: "Font",
  },
  {
    label: "Style",
  },
]);
const activeTab = ref("Font");
const setTabActive = (item) => {
  activeTab.value = item.label;
};

const emit = defineEmits();
const inputChange = (value) => {
  emit("fontChange", {
    type: "content",
    content: value,
  });
};
const fontFamilyClick = (item) => {
  const { fontSizeName, extend1 } = item;
  emit("fontChange", {
    type: "fontFamily",
    content: fontSizeName,
    fontFile: dealImageUrlNew(extend1),
  });
};
const colorChange = (color) => {
  emit("fontChange", {
    type: "color",
    content: color,
  });
};
const styleChange = (item) => {
  switch (item.key) {
    case "align-left":
      emit("fontChange", {
        type: "textAlign",
        content: "left",
      });
      break;
    case "align-center":
      emit("fontChange", {
        type: "textAlign",
        content: "center",
      });
      break;
    case "align-right":
      emit("fontChange", {
        type: "textAlign",
        content: "right",
      });
      break;
    case "bold":
      emit("fontChange", {
        type: "fontWeight",
        content: "bold",
      });
      break;
    case "italic":
      emit("fontChange", {
        type: "fontStyle",
        content: "italic",
      });
      break;
    case "line-through":
      emit("fontChange", {
        type: "textDecoration",
        content: "line-through",
      });
      break;
  }
};
</script>

<style lang="less" scoped>
.font-dialog {
  height: 275px;
  width: 100%;
  overflow: hidden;
  .input-line {
    position: relative;
    .type-input {
      padding: 0 10px;
    }
    .check-icon {
      position: absolute;
      right: 10px;
      top: 18px;
      cursor: pointer;
    }
  }
  .tabs-line {
    padding: 0 10px;
    margin-top: 10px;
    height: 30px;
    line-height: 30px;
    display: flex;
    gap: 0 10px;
    .single-tab {
      color: #d3d3d3;
      font-family: "JostMedium";
      font-size: 20px;
    }
    .single-tab-active {
      color: #000;
    }
  }
  .image-scroll {
    overflow: hidden auto;
    height: calc(100% - 100px);
    .images-container {
      overflow: hidden;
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
  .style-container {
    .color-list {
      margin-top: 15px;
      padding: 0 10px;
      height: 40px;
      width: 100vw;
      overflow: auto;
      display: flex;
      flex-direction: row;
      gap: 15px;
      .single-color {
        display: inline-block;
        height: 30px;
        min-width: 30px;
        border: 1px solid rgb(150, 150, 150);
        border-radius: 50%;
      }
    }
    .style-list {
      margin-top: 15px;
      padding: 0 10px;
      height: 30px;
      width: 100vw;
      display: flex;
      flex-direction: row;
      gap: 15px;
    }
  }
}
</style>