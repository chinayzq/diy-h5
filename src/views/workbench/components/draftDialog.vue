<template>
  <div class="draft-dialog">
    <div class="title-line">
      <span class="title-span">My Unfinished Masterpieces</span>
      <var-icon
        class="close-icon"
        name="window-close"
        :size="30"
        @click="closeHandler"
      />
    </div>
    <div class="draft-list">
      <Loading v-show="listLoading" />
      <div class="single-draft" @click="emit('close')">
        <div class="icon-container">
          <img src="@/assets/images/drafts_add_button.png" alt="" />
        </div>
        <div class="background-container"></div>
      </div>
      <div
        class="single-draft"
        v-for="(item, index) in draftList"
        :key="index"
        @click="draftClickHandler(item)"
      >
        <div class="image-container">
          <var-image
            style="height: 100%; width: 100%"
            lazy
            :loading="$LoadingImage"
            :src="item.templateUrl"
          />
        </div>
        <div class="background-container">
          {{ dateFormat(item.createdDate) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { getDraftList } from "@/api/workbench";
import { dateFormat } from "@/utils";
const listLoading = ref(false);
const draftList = ref([]);
onBeforeMount(() => {
  initDraftList();
});
const initDraftList = () => {
  listLoading.value = true;
  getDraftList({
    offset: 0,
    pageSize: 50,
  })
    .then((res) => {
      if (res.code === 200) {
        draftList.value = res.data;
      }
    })
    .finally(() => {
      listLoading.value = false;
    });
};

const emit = defineEmits();
const closeHandler = () => {
  emit("close");
};
const draftClickHandler = (item) => {
  emit("draftSelect", item);
};
</script>

<style lang="less" scoped>
.draft-dialog {
  height: 500px;
  width: 100%;
  padding: 15px 10px 15px 15px;
  overflow: hidden;
  .title-line {
    position: relative;
    text-align: center;
    margin: 10px 0 40px;
    .title-span {
      font-family: "JostMedium";
      font-size: 18px;
      font-style: normal;
    }
    .close-icon {
      position: absolute;
      right: 5px;
      top: -10px;
    }
  }
  .draft-list {
    width: 100%;
    height: 390px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
    position: relative;
    padding-bottom: 20px;
    .single-draft {
      width: calc(50% - 10px);
      min-height: 200px;
      height: 200px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-container {
        width: 70%;
        height: 100%;
        border-radius: 25px;
        background-color: #f8f5ed;
        display: flex;
        justify-content: center;
        align-items: center;
        & > img {
          width: 70%;
        }
      }
      .image-container {
        width: 70%;
        height: 100%;
        border-radius: 25px;
      }
      .background-container {
        width: 100%;
        height: 15%;
        position: absolute;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(#00000010, #00000060);
        color: #fff;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>