<template>
  <div class="common-header">
    <div class="title-line">
      <var-icon
        v-show="props.source !== 'home'"
        @click="menuShow = true"
        name="menu"
        class="menu-icon"
      />
      <img
        v-if="currentEnv === 'colgifts'"
        @click="jumpToHome"
        class="title-logo"
        src="@/assets/images/project_logo.png"
        alt=""
      />
      <img
        v-if="currentEnv === 'memtoys'"
        @click="jumpToHome"
        class="title-logo"
        src="@/assets/images/memtoys_logo.png"
        alt=""
      />
      <img
        v-show="props.source === 'home'"
        @click="jumpToLogin"
        class="login-logo"
        src="@/assets/images/user.svg"
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
import Cookies from "js-cookie";
import config from "~/config";

const currentEnv = ref(config[import.meta.env.MODE].env);
console.log("currentEnv", currentEnv);
const props = defineProps({
  source: {
    type: String,
    default() {
      return "";
    },
  },
});
// 判断，如果当前已经登录，则展示UserInfo，没有登录则展示Login
const linkList = ref([
  {
    label: "Home",
    path: "/home",
  },
  {
    label: "Login",
    path: "/login",
  },
  {
    label: "about us",
    type: "common",
    id: 6,
  },
  {
    label: "contact us",
    type: "common",
    id: 5,
  },
  {
    label: "Returnd & Refunds",
    type: "common",
    id: 4,
  },
  {
    label: "Terms & Conditions",
    type: "common",
    id: 3,
  },
  {
    label: "Shipping & Delivery",
    type: "common",
    id: 2,
  },
  {
    label: "Privacy Policy",
    type: "common",
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
const jumpToLogin = () => {
  const currentToken = Cookies.get("token");
  const path = currentToken ? "/userInfo" : "/login";
  router.push({
    path,
  });
};
const jumpToPage = ({ id, type, path }) => {
  if (type === "common") {
    router.push(`/common?id=${id}`);
  } else {
    router.push(path);
  }
  // if (id === 0) {
  //   router.push("/");
  // } else {
  //   router.push(`/common?id=${id}`);
  // }
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
    .login-logo {
      height: 20px;
      width: 20px;
      position: absolute;
      right: 0;
      top: calc(50% - 10px);
      cursor: pointer;
    }
    .title-logo {
      cursor: pointer;
      width: 200px;
      height: 59px;
    }
  }
  .single-item {
    margin-top: 15px;
    padding-left: 20px;
  }
}
</style>
