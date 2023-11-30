<template>
  <div class="user-info-page common-mobile-component">
    <CommonHeader />
    <div class="main-container">
      <div class="main-title">Account</div>
      <div class="margin-top">
        Welcome back, {{ userInfo.firstName + userInfo.lastName }}
      </div>
      <div class="log-out">
        <var-icon name="account-circle" />
        <span class="link" @click="logoutHandler"> log-out </span>
      </div>
      <div class="continue-button" @click="jumpToWorkbench">
        <div class="inner">Start/Countinue</div>
      </div>
      <div class="second-title margin-top">Order history</div>
      <div class="margin-top" v-if="orderList.length === 0">
        You haven't placed any orders yet.
      </div>
      <div class="margin-top" v-else>
        <var-collapse v-model="collapseValue" accordion :offset="false">
          <var-collapse-item
            :title="item.orderId"
            :name="index"
            v-for="(item, index) in orderList"
            :key="index"
          >
            <div class="order-single">
              <span class="label"> Oreder: </span>
              <span class="value" style="color: #ff0000">
                {{ item.orderId }}
              </span>
            </div>
            <div class="order-single">
              <span class="label"> Date: </span>
              <span class="value">
                {{ orderTimeRender(item.createdDate) }}
              </span>
            </div>
            <div class="order-single">
              <span class="label"> Status: </span>
              <span class="value">
                {{ statusMap[item.status] }}
              </span>
            </div>
            <div class="order-single">
              <span class="label"> Total: </span>
              <span class="value"> ${{ item.paidPrice }} </span>
            </div>
            <div class="view-button" @click="viewHandler(item.orderId)">
              VIEW
            </div>
          </var-collapse-item>
        </var-collapse>
      </div>
      <div class="account-details">
        <div class="second-title margin-top">Account details</div>
        <div class="margin-top">
          {{ userInfo.firstName + userInfo.lastName }}
        </div>
        <div class="margin-top">{{ userInfo.email }}</div>
      </div>
    </div>
    <CommonFooter />
  </div>
</template>

<script setup>
import CommonHeader from "@/components/CommonHeader/index.vue";
import CommonFooter from "@/components/CommonFooter/index.vue";
import { useRouter } from "vue-router";
import { getUserOrderList, getUserInfo } from "@/api/workbench";
import { ref } from "vue";
import Cookies from "js-cookie";
import { orderTimeRender } from "@/utils";

const collapseValue = ref(0);
const statusMap = ref({
  0: "on hold",
  1: "processing",
  2: "completed",
  3: "refunded",
});

const router = useRouter();
const jumpToWorkbench = () => {
  router.push("/workbench");
};
const logoutHandler = () => {
  Cookies.remove("token");
  router.push("/login");
};
const viewHandler = (orderId) => {
  router.push({
    path: "/orderDetail",
    query: {
      orderId,
    },
  });
};
const orderList = ref([]);
const userInfo = ref({});
const initDatas = () => {
  // 获取token，如果没有直接跳login
  if (!Cookies.get("token")) {
    router.push("/login");
  }
  // 调用用户详情接口
  getUserInfo().then((res) => {
    if (res.code === 200) {
      userInfo.value = res.data;
    }
  });
  // 调用订单列表接口
  getUserOrderList().then((res) => {
    if (res.code === 200) {
      orderList.value = res.data.list;
    }
  });
};
initDatas();
</script>

<style lang="less" scoped>
.user-info-page {
  background: #fff;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  padding: 0 20px 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .main-container {
    flex: 1;
    margin-top: 30px;
    overflow: auto;
    .main-title {
      font-size: 18px;
      color: #000;
    }
    .second-title {
      font-size: 16px;
      color: #000;
    }
    .log-out {
      color: #e73295;
      margin: 10px 0 30px;
      .link {
        text-decoration: underline;
        font-family: "JostMedium";
        cursor: pointer;
        margin-left: 5px;
      }
    }
    .order-single {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      margin: 10px 0;
      border-bottom: 1px solid #efefef;
      .label {
        font-weight: bold;
      }
    }
    .view-button {
      width: 80px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      background: #e73295;
      border-radius: 5px;
      color: #fff;
    }
    .margin-top {
      margin-top: 10px;
    }
    .account-details {
      margin: 30px 0;
    }
    .continue-button {
      margin: 20px 0 40px 15px;
      height: 40px;
      width: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f184bf;
      border-radius: 40px;
      box-shadow: -6px -6px 10px #939393;
      cursor: pointer;
      .inner {
        height: 30px;
        width: 120px;
        border-radius: 40px;
        background: #e73295;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-family: "JostMedium";
      }
    }
  }
}
</style>