<template>
  <div class="order-detail-page common-mobile-component">
    <Loading v-show="pageLoading" />
    <div class="title-line">Thank you for your order</div>
    <div class="main-container">
      <div class="name-line">Hi {{ orderDetails?.userDTO?.lastName }},</div>
      <div class="order-id-line top-margin">
        Just to let you know - we've received your order {{ orderId }}, and it
        is now being processed:
      </div>
      <div class="order-title top-margin">
        [Order {{ orderId }}]
        <br />
        ({{ orderTimeRender(orderDetails.createdDate) }})
      </div>
      <div class="product-table top-margin">
        <div class="table-title-line">
          <span class="title-span flex-6">Product</span>
          <span class="title-span flex-2">Quantity</span>
          <span class="title-span flex-2">Price</span>
        </div>
        <div
          v-for="(item, index) in productList"
          :key="index"
          class="single-product-line"
        >
          <span class="single-span flex-6">
            <div>
              {{ item.description }}
            </div>
            <div class="margin-top-5">
              model: {{ item.extendJson.phoneName }}
            </div>
            <div class="margin-top-5">Custom design</div>
            <div class="margin-top-5">
              <img
                class="product-image"
                :src="`/colgifts/image/${item.templateUrl}`"
                alt=""
              />
            </div>
          </span>
          <span class="single-span flex-center-center flex-2">{{
            item.productCount
          }}</span>
          <span class="single-span flex-center-center flex-2"
            >${{ item.extendJson.curPrice }}</span
          >
        </div>
      </div>
      <div class="subtotal-line">
        <span class="flex-8 label">Subtotal:</span>
        <span class="flex-2">${{ paidPrice }}</span>
      </div>
      <div class="subtotal-line">
        <span class="flex-8 label">Payment method:</span>
        <span class="flex-2">-</span>
      </div>
      <div class="subtotal-line">
        <span class="flex-8 label">Total:</span>
        <span class="flex-2">${{ paidPrice }}</span>
      </div>
      <div class="billing-address">Billing address</div>
      <div class="billing-details">
        <div>
          {{ `${billingJson?.country} ${billingJson?.postcode}` }}
        </div>
        <div>
          {{
            `${billingJson?.stateCountry} ${billingJson?.city} ${billingJson?.streetAddress}`
          }}
        </div>
        <div>
          {{ `${billingJson?.lastName} ${billingJson?.firstName}` }}
        </div>
        <div class="under-line phone-span">
          {{ billingJson?.phone }}
        </div>
        <div class="under-line email-span">
          {{ billingJson?.email }}
        </div>
      </div>
      <div class="thank-you">
        Thanks for using
        <a class="link-span" href="https://www.memtoys.com">
          https://www.memtoys.com
        </a>
        !
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { getOrderDetailById } from "@/api/workbench";
import { computed, ref } from "vue";
import { orderTimeRender } from "@/utils";
const route = useRoute();
const pageLoading = ref(false);
const orderDetails = ref({});
const initDatas = () => {
  const { orderId } = route.query;
  if (orderId) {
    pageLoading.value = true;
    getOrderDetailById(orderId)
      .then((res) => {
        orderDetails.value = res.data;
      })
      .finally(() => {
        pageLoading.value = false;
      });
  }
};
initDatas();

const userName = computed(
  () =>
    `${orderDetails.value?.userDTO?.firstName} ${orderDetails.value?.userDTO?.lastName}`
);
const orderId = computed(() => orderDetails.value?.orderId);
const productList = computed(() => orderDetails.value?.productJson);
const paidPrice = computed(() => orderDetails.value?.paidPrice);
const billingJson = computed(() => orderDetails.value?.userDTO?.billingJson);
</script>

<style lang="less" scoped>
.order-detail-page {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  overflow: auto;
  .title-line {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #7f54b3;
    color: #fff;
    font-size: 18px;
  }
  .main-container {
    font-size: 12px;
    // font-family: "JostMedium";
    padding: 30px 20px;
    .order-id-line {
      line-height: 20px;
    }
    .order-title {
      font-size: 14px;
      font-weight: bold;
      color: #7f54b3;
    }
    .top-margin {
      margin-top: 15px;
    }
    .product-table {
      .margin-top-5 {
        margin-top: 5px;
      }
      .table-title-line {
        display: flex;
        .title-span {
          display: inline-block;
          padding: 10px;
          border: 1px solid #ccc;
          font-weight: bold;
          color: #333;
          box-sizing: border-box;
        }
      }
      .single-product-line {
        display: flex;
        .single-span {
          border: 1px solid #ccc;
          display: inline-block;
          color: #333;
          font-size: 12px;
          padding: 10px;
          box-sizing: border-box;
          .product-image {
            width: 60%;
          }
        }
        .flex-center-center {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .flex-6 {
        flex: 6;
      }
      .flex-2 {
        flex: 2;
      }
    }
    .subtotal-line {
      display: flex;
      span {
        border: 1px solid #ccc;
        padding: 7px;
        box-sizing: border-box;
      }
      .label {
        font-weight: bold;
      }
      .flex-8 {
        flex: 8;
      }
      .flex-2 {
        flex: 2;
      }
    }
    .billing-address {
      margin: 20px 0;
      font-size: 16px;
      font-weight: bold;
      color: #7f54b3;
    }
    .billing-details {
      border: 1px solid #ccc;
      padding: 15px;
      font-style: italic;
      line-height: 25px;
      .under-line {
        text-decoration: underline;
      }
      .phone-span {
        color: #7f54b3;
      }
      .email-span {
        color: blue;
      }
    }
    .thank-you {
      margin-top: 50px;
      .link-span {
        color: blue;
        text-decoration: underline;
      }
    }
  }
}
</style>