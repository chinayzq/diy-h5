<template>
  <div class="navigation-bar-component">
    <div
      class="single-item"
      @click="itemClickHandler(item.key)"
      v-for="item in items"
      :key="item.key"
    >
      <template v-if="item.key === 'image'">
        <var-uploader @after-read="uploadSuccess" hide-list v-model="files">
          <div :class="['icon-line', `icon-${item.key}`]"></div>
          <div class="name-line">
            {{ item.label }}
          </div>
        </var-uploader>
      </template>
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
import { ref } from "vue";
const files = ref([]);
const items = ref([
  {
    label: "Stickers",
    key: "stickers",
  },
  {
    label: "Font",
    key: "font",
  },
  {
    label: "Image",
    key: "image",
  },
  {
    label: "Templates",
    key: "templates",
  },
]);
const currentClient = judgeClient();
if (currentClient === "PC") {
  items.value = items.value.filter((item) => item.key !== "templates");
}

const emit = defineEmits();
const itemClickHandler = (key) => {
  emit("naviClick", key);
};

const uploadSuccess = (file) => {
  emit("naviClick", "image", file.cover);
};
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
}
</style>
