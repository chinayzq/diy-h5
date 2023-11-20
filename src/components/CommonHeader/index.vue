<template>
  <div class="common-header">
    <div class="title-line">
      <var-icon @click="menuShow = true" name="menu" class="menu-icon" />
      <img
        @click="jumpToHome"
        class="title-logo"
        src="@/assets/images/project_logo.png"
        alt=""
      />
    </div>
    <var-popup
      overlay-class="popup-custom-overlay"
      position="top"
      v-model:show="menuShow"
    >
      <div
        @click="jumpToPage(item)"
        style="
          font-size: 14px;
          cursor: pointer;
          margin: 8px 0;
          padding-left: 15px;
          font-family: JostMedium;
        "
        v-for="(item, index) in linkList"
        :key="index"
      >
        {{ item.label }} >
      </div>
    </var-popup>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const linkList = ref([
  {
    label: "Home",
    id: 0,
  },
  {
    label: "about us",
    id: 6,
  },
  {
    label: "contact us",
    id: 5,
  },
  {
    label: "Returnd & Refunds",
    id: 4,
  },
  {
    label: "Terms & Conditions",
    id: 3,
  },
  {
    label: "Shipping & Delivery",
    id: 2,
  },
  {
    label: "Privacy Policy",
    id: 1,
  },
]);

const menuShow = ref(false);

const router = useRouter();
const jumpToHome = () => {
  router.push({
    path: "/",
  });
};
const jumpToPage = ({ id }) => {
  if (id === 0) {
    router.push("/");
  } else {
    router.push(`/common?id=${id}`);
  }
  menuShow.value = false;
};
</script>

<style lang="less" scoped>
.common-header {
  .title-line {
    height: 70px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .menu-icon {
      position: absolute;
      left: 0;
      top: calc(50% - 10px);
      cursor: pointer;
    }
    .title-logo {
      cursor: pointer;
    }
  }
  .single-item {
    margin-top: 15px;
    padding-left: 20px;
  }
}
</style>