<template>
  <div class="cart-list">
    <div>
      <div class="title-line">
        <span class="title-label"> Your cart </span>
        <var-icon name="window-close" :size="30" @click="emit('close')" />
      </div>
      <!-- <div class="tips-container">
        <div class="tips-line">
          35%OFF for orders over 40USD / 50%OFF for orders over 70USD
        </div>
      </div> -->
      <div class="list-title">
        <span>PRODUCT</span>
        <span>TOTAL</span>
      </div>
    </div>
    <div class="list-container">
      <Loading v-show="listLoading" />
      <div class="single-cart" v-for="(item, index) in cartList" :key="index">
        <span class="image-container">
          <var-image
            width="50"
            height="100"
            :loading="$LoadingImage"
            :src="`/colgifts/image/${item.templateUrl}`"
            lazy
            alt=""
          />
        </span>
        <div class="center-container">
          <div class="detail-line">
            <div class="detail-part">
              <div class="model-and-color">
                {{ item.extendJson.phoneName }}
                -
                {{ item.extendJson.caseColor }}
              </div>
              <div class="price-line">
                <span>$</span>
                <span>{{ item.extendJson.curPrice }}</span>
              </div>
            </div>
            <div class="subtotal-part">
              <span>$</span>
              <span>
                {{ item.extendJson.curPrice * item.productCount }}
              </span>
            </div>
          </div>
          <div class="counter-line">
            <var-icon
              name="minus"
              @click="item.productCount > 0 && item.productCount--"
            />
            <span class="count-span">
              {{ item.productCount }}
            </span>
            <var-icon name="plus" @click="item.productCount++" />
            <var-icon
              name="trash-can-outline"
              style="color: #e73295"
              @click="deleteHandler(item)"
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="coupon-line">
        <div class="coupon-label">Discount Code/ Coupon</div>
        <var-input
          variant="outlined"
          class="coupon-input"
          size="small"
          @blur="couponValid"
          v-model="coupon"
        />
      </div>
      <div class="price-detail">
        <div class="saving-line">
          <span class="saving-label"> Savings </span>
          <span class="saving-value"> -${{ savingTotal }} USD </span>
        </div>
        <div class="subtotal-line">
          <span class="saving-label"> Subtotal </span>
          <span class="saving-value">
            <span
              class="through-span"
              v-if="originTotal > 0 && originTotal !== payTotal"
            >
              ${{ originTotal }}
            </span>
            ${{ payTotal }} USD
          </span>
        </div>
        <div class="tips-line">Taxes and shipping calculated at checkout</div>
      </div>
      <div class="button-line">
        <div class="checkout-outer">
          <div class="checkout-inner">Check out</div>
        </div>
        <div class="home-button">
          <img src="@/assets/images/home.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCartList, deleteCart, couponAmount } from "@/api/workbench";
import { onBeforeMount, ref, watch } from "vue";

// 总优惠金额
const savingTotal = ref(0);
// 折扣前总金额
const originTotal = ref(0);
// 实付金额
const payTotal = ref(0);
onBeforeMount(() => {
  initDatas();
});

const cartList = ref([]);
const listLoading = ref(false);
const initDatas = () => {
  listLoading.value = true;
  getCartList()
    .then((res) => {
      cartList.value = res.data;
    })
    .finally(() => {
      listLoading.value = false;
    });
};

const emit = defineEmits();

const coupon = ref(null);
const couponValid = () => {
  if (!coupon.value) return;
  couponAmount({
    couponCode: coupon.value,
    originalPrice: originTotal.value,
  }).then((res) => {
    if (res.code === 200) {
      savingTotal.value = res.data;
      payTotal.value = originTotal.value - savingTotal.value;
    }
  });
};

const deleteHandler = ({ cardId }) => {
  deleteCart(cardId).finally(() => {
    initDatas();
  });
};

watch(
  () => cartList.value,
  () => {
    countCalc();
  },
  { deep: true }
);
const countCalc = () => {
  let originTotalTemp = 0;
  let savingTotalTemp = 0;
  cartList.value.forEach((item) => {
    originTotalTemp += item.extendJson.curPrice * item.productCount;
  });
  originTotal.value = originTotalTemp;
  savingTotal.value = savingTotalTemp;
  payTotal.value = originTotalTemp - savingTotalTemp;
};
</script>

<style lang="less" scoped>
.cart-list {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 15px 15px 0 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-label {
      font-family: "JostMedium";
      font-size: 20px;
      color: #000000;
    }
  }
  .tips-container {
    overflow: hidden;
    .tips-line {
      white-space: nowrap;
      font-size: 14px;
      color: #e73295;
      font-weight: 700;
      animation: tipScrollAnimation 8s infinite;
    }
  }
  .list-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "JostMedium";
    font-size: 12px;
    color: rgba(26, 22, 24, 0.75);
    padding-bottom: 15px;
    border-bottom: 1px solid #ccc;
  }
  .list-container {
    flex: 1;
    position: relative;
    // height: 550px;
    width: 100%;
    overflow: auto;
    .single-cart {
      height: 150px;
      width: 100%;
      display: flex;
      padding: 0 10px;
      border-bottom: 1px solid #ccc;
      .image-container {
        display: flex;
        align-items: center;
        padding: 0 20px;
      }
      .center-container {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 20px;
        .detail-line {
          display: flex;
          justify-content: space-between;
          padding: 20px 0 20px 30px;
          .model-and-color {
            font-size: 15px;
            line-height: 16px;
            color: rgba(26, 22, 24, 0.75);
            font-family: "JostMedium";
          }
          .price-line {
            font-size: 15px;
            color: rgba(26, 22, 24, 0.75);
            font-family: "JostMedium";
          }
          .subtotal-part {
            font-size: 16px;
            color: rgba(26, 22, 24, 0.75);
            font-family: "JostMedium";
            margin-left: 10px;
          }
        }
        .counter-line {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          .count-span {
            font-size: 16px;
          }
        }
      }
    }
  }
  .coupon-line {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    .coupon-label {
      font-family: "JostMedium";
      font-size: 15px;
      color: #00000090;
    }
    .coupon-input {
      width: 40%;
    }
  }
  .price-detail {
    font-size: 15px;
    font-family: "JostMedium";
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .saving-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .saving-value {
        color: #e73295;
      }
    }
    .subtotal-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      .through-span {
        text-decoration: line-through;
        color: rgba(26, 22, 24, 0.75);
        margin-right: 5px;
      }
    }
    .tips-line {
      width: 100%;
      text-align: left;
      color: rgba(26, 22, 24, 0.75);
    }
  }
  .button-line {
    display: flex;
    align-items: center;
    margin: 10px 0;
    .checkout-outer {
      width: 274px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e7329560;
      border-radius: 45px;
      cursor: pointer;
      .checkout-inner {
        width: 250px;
        height: 46px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
        font-size: 16px;
        font-family: "JostMedium";
        background-color: #e73295;
        border-radius: 45px;
      }
    }
    .home-button {
      cursor: pointer;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      background-color: rgba(231, 50, 149, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 15px;
      img {
        height: 20px;
        width: 20px;
      }
    }
  }
  @keyframes tipScrollAnimation {
    0% {
      transform: translate(100%);
    }

    to {
      transform: translate(-50%);
    }
  }
}
</style>