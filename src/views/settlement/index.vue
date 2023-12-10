<template>
  <div class="settlement-page-component">
    <div class="main-title">Get your own gallery of your design!</div>
    <div class="second-title">
      <div class="title-line">My Masterpieces</div>
      <div class="link-line">
        <span class="create-link link-span" @click="jumpToWorkbench">
          CREATE A NEW ONE
        </span>
        <!-- <span class="share-link link-span"> share link </span> -->
      </div>
    </div>
    <div class="list-container">
      <Loading v-show="listLoading" />
      <div class="single-item" v-for="(item, index) in itemList" :key="index">
        <div class="left-part">
          <var-checkbox v-model="item.checked"></var-checkbox>
          <var-image
            class="item-image"
            width="70"
            height="135"
            style="display: flex; justify-content: center; align-items: center"
            :loading="$LoadingImage"
            :src="`https://ossdiyphone.com/${item.templateUrl}`"
            alt=""
          />
        </div>
        <div class="right-part">
          <div>
            <div class="item-title">
              <span class="product-name">Phone Case</span>
              <span class="product-price"
                >{{ item.extendJson.curPrice }} USD</span
              >
            </div>
            <div class="item-second-title">
              {{ item.extendJson.phoneName }} - {{ item.extendJson.caseColor }}
            </div>
          </div>
          <div class="link-line">
            <span class="save" @click="saveImageToLocal(item)">
              save image
            </span>
            <span class="remove" @click="removeHandler(item)"> remove </span>
          </div>
          <div class="number-control">
            <var-icon name="minus" @click="item.count > 0 && item.count--" />
            <span class="count-span">
              {{ item.count }}
            </span>
            <var-icon name="plus" @click="item.count++" />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-container">
      <div class="single-line">
        <span> Subtotal </span>
        <span class="font-italic"> {{ Subtotal }} USD </span>
      </div>
      <div class="single-line">
        <span> Shipping </span>
        <span class="font-italic">
          {{ free ? "FREE" : `${shipping} USD` }}
        </span>
        <span class="font-italic"> Buy 2 get free shipping </span>
      </div>
      <div class="border-line"></div>
      <div class="single-line">
        <span> Estimated Total </span>
        <span class="font-italic"> {{ Subtotal }} USD </span>
      </div>
      <div class="button-line">
        <span
          :class="['add-button', !policyChecked && 'add-button-disabled']"
          @click="addCardHandler"
        >
          Add to card
        </span>
        <span class="shipping-cart">
          <img src="@/assets/images/shopping-cart.svg" alt="" />
        </span>
      </div>
      <div class="policy-line">
        <var-checkbox v-model="policyChecked"></var-checkbox>
        <span class="link-span" @click="policyLinkJump('policyUrl')">
          our policy
        </span>
        <span class="link-span" @click="policyLinkJump('contactUrl')">
          contact us
        </span>
      </div>
    </div>
    <var-popup
      overlay-class="card-list-pop"
      position="right"
      v-model:show="cartShow"
    >
      <CartList
        v-if="cartShow"
        @close="cartShow = false"
        :shipping="shipping"
      />
    </var-popup>
  </div>
</template>

<script setup>
import {
  getProductList,
  deleteProduct,
  saveCart,
  getShipping,
  getPrivacy,
} from "@/api/workbench";
import { onBeforeMount, ref, watch } from "vue";
import { getStorage } from "@/utils/localStorage";
import CartList from "./components/cartList.vue";
import { useRouter } from "vue-router";

const currentLocal = getStorage();
const currentProductId = ref(currentLocal.selectProductId);

const policyChecked = ref(true);
const shipping = ref(0);
const itemList = ref([]);
const policyUrlMap = ref({
  policyUrl: null,
  contactUrl: null,
});
onBeforeMount(async () => {
  listLoading.value = true;
  const shippingValue = await getShipping();
  shipping.value = Number(shippingValue.data).toFixed(2);
  getProductList()
    .then((res) => {
      itemList.value = res.data.map((item) => {
        item.checked = item.productId === currentProductId.value;
        item.count = 1;
        return item;
      });
    })
    .finally(() => {
      listLoading.value = false;
    });
  getPrivacy().then((res) => {
    if (res.code === 200) {
      const { extend1, extend2 } = res.data;
      policyUrlMap.value.policyUrl = extend1;
      policyUrlMap.value.contactUrl = extend2;
    }
  });
});
const policyLinkJump = (type) => {
  const url = policyUrlMap.value[type];
  window.open(url, "_self");
};

watch(
  () => itemList.value,
  () => {
    countCalc();
  },
  { deep: true }
);
const Subtotal = ref(0);
const free = ref(false);
const countCalc = () => {
  let subTotalTemp = 0;
  let checkedCount = 0;
  itemList.value.forEach((item) => {
    if (item.checked) {
      checkedCount += item.count;
      subTotalTemp += item.count * item.extendJson.curPrice;
    }
  });
  free.value = checkedCount > 1;
  if (checkedCount === 1) {
    Subtotal.value = (subTotalTemp + Number(shipping.value)).toFixed(2);
  } else {
    Subtotal.value = subTotalTemp.toFixed(2);
  }
};

const removeHandler = (item) => {
  for (let i = 0; i < itemList.value.length; i++) {
    if (itemList.value[i].productId === item.productId) {
      itemList.value.splice(i, 1);
      break;
    }
  }
  deleteProduct(item.productId);
};

const saveImageToLocal = (item) => {
  let image = new Image();
  image.setAttribute("crossOrigin", "anonymous");
  image.src = dealImageUrl(`https://ossdiyphone.com/${item.templateUrl}`);
  image.onload = function () {
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);
    let url = canvas.toDataURL("image/png");
    let a = document.createElement("a");
    a.download = `product_preview`;
    a.href = url;
    a.click();
  };
};

const cartShow = ref(false);
const listLoading = ref(false);
const addCardHandler = () => {
  if (!policyChecked) return;
  let checkedItemList = itemList.value.filter((item) => item.checked);
  const params = checkedItemList.map((item) => {
    // item.extendJson.subTotal = item.count * item.extendJson.curPrice;
    return {
      description: "",
      extendJson: item.extendJson,
      phoneCode: item.phoneCode,
      productCount: item.count,
      productId: item.productId,
      templateUrl: item.templateUrl,
    };
  });
  listLoading.value = true;
  saveCart(params).finally(() => {
    listLoading.value = false;
    cartShow.value = true;
  });
};

const router = useRouter();
const jumpToWorkbench = () => {
  router.push({
    path: "/",
  });
};
</script>

<style lang="less" scoped>
.settlement-page-component {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  .main-title {
    width: 100%;
    height: 35px;
    line-height: 35px;
    background-color: #c54f91;
    color: #fff;
    text-align: center;
    font-size: 15px;
    font-family: "JostMedium";
  }
  .second-title {
    width: 100%;
    height: 80px;
    .title-line {
      width: 100%;
      text-align: center;
      font-family: "JostMedium";
      font-size: 35px;
      font-style: italic;
    }
    .link-line {
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
      .link-span {
        color: #fff;
        font-size: 15px;
        font-family: "JostMedium";
        border-radius: 12px;
        padding: 0 10px;
        cursor: pointer;
      }
      .create-link {
        background-color: #c54f91;
      }
      .share-link {
        background-color: rgb(148, 179, 76);
        font-style: italic;
        color: #000000;
      }
    }
  }
  .list-container {
    width: 100%;
    height: calc(100% - 360px);
    overflow: auto;
    padding-bottom: 50px;
    padding-top: 10px;
    box-sizing: border-box;
    .single-item {
      height: 153px;
      box-sizing: border-box;
      width: calc(100% - 40px);
      border-top: 1px solid #8a8984;
      margin: 0 20px;
      display: flex;
      .left-part {
        display: flex;
        align-items: center;
      }
      .right-part {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px 0 15px 20px;
        .item-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .product-name {
            font-size: 25px;
            font-family: "JostMedium";
          }
          .product-price {
            color: #c54f91;
            font-family: "JostMedium";
            font-size: 16px;
          }
        }
        .item-second-title {
          line-height: 10px;
          font-size: 15px;
          font-family: "JostMedium";
        }
        .link-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          text-decoration: underline;
          .save {
            cursor: pointer;
            color: #8a8984;
            font-size: 16px;
          }
          .remove {
            cursor: pointer;
          }
        }
        .number-control {
          width: 100%;
          height: 25px;
          line-height: 25px;
          display: flex;
          justify-content: space-evenly;
          background-color: #c5c4be;
          .count-span {
            font-size: 16px;
          }
        }
      }
    }
  }
  .bottom-container {
    box-sizing: border-box;
    padding: 20px 0;
    height: 245px;
    width: 100%;
    background: #000000;
    color: #ffffff;
    border-radius: 20px 20px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .font-italic {
      font-style: italic;
    }
    .single-line {
      padding: 0 20px;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      font-family: "JostMedium";
      margin-bottom: 10px;
    }
    .border-line {
      border-top: 2px solid #2f2e2c;
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }
    .button-line {
      width: 100%;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      .add-button {
        display: inline-block;
        width: 270px;
        height: 40px;
        line-height: 40px;
        background-color: rgb(148, 179, 76);
        color: #000000;
        cursor: pointer;
        font-size: 15px;
        font-family: "JostMedium";
        border-radius: 20px;
        text-align: center;
      }
      .add-button-disabled {
        background-color: lightgray;
      }
      .shipping-cart {
        display: inline-block;
        height: 40px;
        width: 40px;
        background-color: #c54f91;
        border-radius: 50%;
        cursor: pointer;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .policy-line {
      box-sizing: border-box;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      .link-span {
        font-family: "JostMedium";
        font-size: 12px;
        color: #fff;
        cursor: pointer;
        text-decoration: underline;
      }
      .link-span + .link-span {
        margin-left: 15px;
      }
    }
  }
}
</style>
