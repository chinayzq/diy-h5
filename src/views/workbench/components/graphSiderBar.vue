<template>
  <div class="graph-sider-bar">
    <div
      :class="['single-item', `${item.customerClass}`]"
      v-for="(item, index) in toolList"
      :key="index"
      @click.stop="toolClick(item)"
    >
      <div
        class="image-line"
        :style="{
          backgroundImage:
            item.label === 'Enlarge' && item.clicked
              ? `url(${item.clickedIcon})`
              : `url(${item.icon})`,
        }"
      ></div>
      <div class="label-line">
        {{
          item.label === "Enlarge" && item.clicked
            ? item.clickedLabel
            : item.label
        }}
      </div>
    </div>
    <div class="layers-container" v-show="layersShow">
      <div
        :class="['single-layer', item.active && 'single-layer-active']"
        v-for="(item, index) in layers"
        :key="index"
        @click.stop="setActive(item)"
      >
        <var-icon
          name="close-circle"
          class="delete-icon"
          @click.stop="deleteHandler(item)"
        />
        <span class="text-one" v-if="item.type === 'text'">
          {{ item.content }}
        </span>
        <img v-else class="image-one" :src="item.url" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const toolList = ref([
  {
    label: "Draft",
    icon: new URL(
      "../../../assets/images/graph_draft_icon.png",
      import.meta.url
    ).href,
    customerClass: "graph-draft-icon",
  },
  {
    label: "Layers",
    icon: new URL(
      "../../../assets/images/graph_layer_icon.png",
      import.meta.url
    ).href,
    clicked: false,
    customerClass: "graph-layers-icon",
  },
  {
    label: "Enlarge",
    clickedLabel: "Shrink",
    icon: new URL(
      "../../../assets/images/graph_enlarge_icon.png",
      import.meta.url
    ).href,
    clickedIcon: new URL(
      "../../../assets/images/graph_dislarge_icon.png",
      import.meta.url
    ).href,
    clicked: false,
    customerClass: "graph-enlarge-icon",
  },
]);
const emit = defineEmits();
const toolClick = (item) => {
  switch (item.label) {
    case "Enlarge":
      item.clicked = !item.clicked;
      emit("fullScreen", item.clicked);
      break;
    case "Draft":
      // 打开draftDialog
      emit("openDraftDialog");
      break;
    case "Layers":
      // 打开图层popup
      item.clicked = !item.clicked;
      layersShow.value = item.clicked;
      break;
  }
};

const props = defineProps({
  layers: {
    type: Array,
    default() {
      return [];
    },
  },
});
const layersShow = ref(false);
const setActive = ({ id }) => {
  emit("setActive", id);
};
const deleteHandler = (item) => {
  emit("deleteItem", item);
};
</script>

<style lang="less" scoped>
.graph-sider-bar {
  z-index: 10;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 62px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .single-item {
    height: 42px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .image-line {
      height: 22px;
      width: 22px;
      background-size: 100% 100%;
    }
    .label-line {
      color: #5c5c66;
      font-size: 8px;
      font-weight: 600;
      font-style: normal;
      font-family: "JostMedium";
    }
  }
  .layers-container {
    background-color: rgba(0, 0, 0, 0.2);
    width: 72px;
    overflow: auto;
    position: fixed;
    top: 50px;
    left: 0;
    height: calc(100% - 200px);
    // height: 260px;
    // position: absolute;
    // right: 0;
    // top: -300px;
    padding: 10px 0;
    .single-layer {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 66px;
      height: 66px;
      border: #00000000 solid 1px;
      background: #fff;
      margin-top: 30px;
      position: relative;
      .image-one {
        max-height: 100%;
        max-width: 100%;
      }
      .delete-icon {
        cursor: pointer;
        color: #e15aa3;
        position: absolute;
        right: 0;
        top: -20px;
      }
    }
    .single-layer-active {
      border: aqua solid 1px;
    }
  }
}
</style>