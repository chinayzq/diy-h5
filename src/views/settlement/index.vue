<template>
  <div class="settlement-page-component">
    <div class="main-title">Get your own gallery of your design!</div>
    <div class="second-title">
      <div class="title-line">My Masterpieces</div>
      <div class="link-line">
        <span class="create-link link-span"> CREATE A NEW ONE </span>
        <span class="share-link link-span"> share link </span>
      </div>
    </div>
    <div class="list-container">
      <div class="single-item" v-for="(item, index) in itemList" :key="index">
        <div class="left-part">
          <var-checkbox v-model="item.checked"></var-checkbox>
          <var-image
            class="item-image"
            width="70"
            height="135"
            style="display: flex; justify-content: center; align-items: center"
            :loading="$LoadingImage"
            src="/colgifts/image/c5e772ba2c3c428fab7a6d89a6775861"
            lazy
            alt=""
          />
        </div>
        <div class="right-part">
          <div>
            <div class="item-title">
              <span class="product-name">Phone Case</span>
              <span class="product-price">30 USD</span>
            </div>
            <div class="item-second-title">iPhone14 - Black</div>
          </div>
          <div class="link-line">
            <span class="save"> save image </span>
            <span class="remove"> remove </span>
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
        <span class="font-italic"> 30.00 USD </span>
      </div>
      <div class="single-line">
        <span> Shipping </span>
        <span class="font-italic"> 6.00 USD </span>
        <span class="font-italic"> Buy 2 get free shipping </span>
      </div>
      <div class="border-line"></div>
      <div class="single-line">
        <span> Estimated Total </span>
        <span class="font-italic"> 36.00 USD </span>
      </div>
      <div class="button-line">
        <span :class="['add-button', !policyChecked && 'add-button-disabled']">
          Add to card
        </span>
        <span class="shipping-cart">
          <img src="@/assets/images/shopping-cart.svg" alt="" />
        </span>
      </div>
      <div class="policy-line">
        <var-checkbox v-model="policyChecked"></var-checkbox>
        <span class="link-span"> our policy </span>
        <span class="link-span"> contact us </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const policyChecked = ref(true);

const itemList = ref([
  {
    checked: true,
    count: 1,
  },
  {
    checked: false,
    count: 1,
  },
  {
    checked: false,
    count: 1,
  },
]);
</script>

<style lang="less" scoped>
.settlement-page-component {
  position: absolute;
  height: 100%;
  width: 100%;
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
          cursor: pointer;
          .save {
            color: #8a8984;
            font-size: 16px;
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