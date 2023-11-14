<template>
  <div class="checkout-page-component">
    <div class="title-line">
      <var-icon name="menu" class="menu-icon" />
      <img src="@/assets/images/project_logo.png" alt="" />
    </div>
    <div class="details-container">
      <div class="first-title">Billing details</div>
      <!-- billing form start -->
      <var-form ref="form" scroll-to-error="start">
        <var-space direction="column" :size="[30, 0]">
          <var-input
            variant="outlined"
            size="small"
            placeholder="First name *"
            :rules="[(v) => !!v || 'First name is required']"
            v-model="formData.firstName"
          />
          <var-input
            variant="outlined"
            size="small"
            placeholder="Last name *"
            :rules="[(v) => !!v || 'Last name is required']"
            v-model="formData.lastName"
          />
          <var-input
            variant="outlined"
            size="small"
            placeholder="Email address *"
            :rules="[(v) => !!v || 'Email address is required']"
            v-model="formData.emailAddress"
          />
          <var-input
            variant="outlined"
            size="small"
            placeholder="Phone *"
            :rules="[(v) => !!v || 'Phone is required']"
            v-model="formData.phone"
          />
          <var-select
            variant="outlined"
            size="small"
            placeholder="Country *"
            :rules="[(v) => !!v || 'Country is required']"
            v-model="formData.country"
          >
            <var-option v-for="item in countryList" :label="item" :key="item" />
          </var-select>
          <var-input
            variant="outlined"
            size="small"
            placeholder="House number and street name *"
            :rules="[(v) => !!v || 'street adress is required']"
            v-model="formData.streetAddress"
          />
          <var-input
            variant="outlined"
            size="small"
            placeholder="Apartment, suite, unit etc.(optional)"
            v-model="formData.apartment"
          />
          <var-input
            variant="outlined"
            size="small"
            placeholder="Town / city *"
            :rules="[(v) => !!v || 'Town / city is required']"
            v-model="formData.townCity"
          />
          <var-input
            variant="outlined"
            size="small"
            placeholder="State / Country *"
            :rules="[(v) => !!v || 'State / Country is required']"
            v-model="formData.stateCountry"
          />
          <var-input
            variant="outlined"
            size="small"
            placeholder="Postcode / ZIP *"
            :rules="[(v) => !!v || 'Postcode / ZIP is required']"
            v-model="formData.postcode"
          />
        </var-space>
      </var-form>
      <!-- billing form end -->
      <var-checkbox class="ship-checkbox" v-model="shipDifferentAddress"
        >Ship to a different address?</var-checkbox
      >
      <!-- ship different form start -->
      <div v-show="shipDifferentAddress">
        <var-form ref="shipform" scroll-to-error="start">
          <var-space direction="column" :size="[30, 0]">
            <var-input
              variant="outlined"
              size="small"
              placeholder="First name *"
              :rules="[(v) => !!v || 'First name is required']"
              v-model="shipform.firstName"
            />
            <var-input
              variant="outlined"
              size="small"
              placeholder="Last name *"
              :rules="[(v) => !!v || 'Last name is required']"
              v-model="shipform.lastName"
            />
            <var-input
              variant="outlined"
              size="small"
              placeholder="Email address *"
              :rules="[(v) => !!v || 'Email address is required']"
              v-model="shipform.emailAddress"
            />
            <var-input
              variant="outlined"
              size="small"
              placeholder="Company name"
              v-model="shipform.companyName"
            />
            <var-select
              variant="outlined"
              size="small"
              placeholder="Country *"
              :rules="[(v) => !!v || 'Country is required']"
              v-model="shipform.country"
            >
              <var-option
                v-for="item in countryList"
                :label="item"
                :key="item"
              />
            </var-select>
            <var-input
              variant="outlined"
              size="small"
              placeholder="House number and street name *"
              :rules="[(v) => !!v || 'street adress is required']"
              v-model="shipform.streetAddress"
            />
            <var-input
              variant="outlined"
              size="small"
              placeholder="Apartment, suite, unit etc.(optional)"
              v-model="shipform.apartment"
            />
            <var-input
              variant="outlined"
              size="small"
              placeholder="Town / city *"
              :rules="[(v) => !!v || 'Town / city is required']"
              v-model="shipform.townCity"
            />
            <var-input
              variant="outlined"
              size="small"
              placeholder="State / Country *"
              :rules="[(v) => !!v || 'State / Country is required']"
              v-model="shipform.stateCountry"
            />
            <var-input
              variant="outlined"
              size="small"
              placeholder="Postcode / ZIP *"
              :rules="[(v) => !!v || 'Postcode / ZIP is required']"
              v-model="shipform.postcode"
            />
          </var-space>
        </var-form>
      </div>
      <!-- ship different form end -->
      <var-input
        class="notes-textarea"
        variant="outlined"
        placeholder="Notes about your order, e.g. special&#10; notes for delivery."
        textarea
        rows="2"
        v-model="notesForOrder"
      />
      <div class="first-title margin30">Your order</div>
      <div class="order-title border-line">
        <span> Product </span>
        <span> Subtotal </span>
      </div>
      <div
        v-for="(item, index) in orderList"
        :key="index"
        class="single-order border-line"
      >
        <div class="left-part">
          <span class="image-container">
            <img
              class="order-image"
              src="@/assets/images/gallery_example.webp"
              alt=""
            />
            <var-icon name="close-circle-outline" class="delete-icon" />
          </span>
          <div class="description">
            {{ item.description }}
          </div>
          <div class="count">
            {{ `X ${item.count}` }}
          </div>
        </div>
        <div class="right-part">
          {{ `$${item.orderCount}` }}
        </div>
      </div>
      <div class="subtotal-line">
        <span class="label"> Subtotal </span>
        <span class="value"> $85.00 </span>
      </div>
      <div class="subtotal-line border-line" style="padding-bottom: 20px">
        <span class="label"> Shipping </span>
        <span class="value"> Free shipping </span>
      </div>
      <div class="pay-methods">
        <var-radio-group v-model="payMethod" direction="vertical">
          <var-radio :checked-value="1">PayPal</var-radio>
          <img
            style="width: 100%"
            v-if="payMethod === 1"
            src="@/assets/images/gateway_icon.svg"
            alt=""
          />
          <div v-if="payMethod === 1" class="paypal-tips">Secure payment via PayPal.</div>
          <var-radio :checked-value="2"> Credit/Debit Payment </var-radio>
          <div class="credit-container" v-if="payMethod === 2" >
            <div class="credit-icons" >
              <div class="visa"></div>
              <div class="mastercard" style="background-position: 0 -100px;"></div>
              <div class="amex" style="background-position: 0 -221px;"></div>
            </div>
            <div class="credit-form">
              <var-row style="margin-top: 15px">
                <var-col :span="24">
                  <var-input
                    style="width: 100%;"
                    variant="outlined"
                    size="small"
                    placeholder="Card number *"
                    :rules="[(v) => !!v || 'Card number is required']"
                    v-model="creditForm.cardNumber"
                  />
                </var-col>
              </var-row>  
              <var-row :gutter="[10, 20]" style="margin-top: 15px">
                <var-col :span="12">
                  <var-input
                    variant="outlined"
                    size="small"
                    placeholder="Valid date MM/YY *"
                    :rules="[(v) => !!v || 'Valid date is required']"
                    v-model="creditForm.validDate"
                  />
                </var-col>
                <var-col :span="12">
                  <var-input
                    variant="outlined"
                    size="small"
                    placeholder="Safe Code *"
                    :rules="[(v) => !!v || 'Safe Code is required']"
                    v-model="creditForm.safeCode"
                  />
                </var-col>
              </var-row> 
            </div>
          </div>
        </var-radio-group>
      </div>
      <div class="button-container"> 
        <var-icon name="lock" />
        <span>Place Order  $66.00</span>
      </div>
      <p class="bottom-tips">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="https://www.memtoys.com/privacy-policy/" class="woocommerce-privacy-policy-link" target="_blank">privacy policy</a>.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const shipDifferentAddress = ref(false);
const countryList = ref(["China", "Korea", "American"]);
const notesForOrder = ref(null);
const formData = ref({
  firstName: null,
  lastName: null,
  emailAddress: null,
  phone: null,
  country: null,
  streetAddress: null,
  apartment: null,
  townCity: null,
  stateCountry: null,
  postcode: null,
});
const shipform = ref({
  firstName: null,
  lastName: null,
  emailAddress: null,
  companyName: null,
  country: null,
  streetAddress: null,
  apartment: null,
  townCity: null,
  stateCountry: null,
  postcode: null,
});
const creditForm = ref({
  cardNumber: null,
  validDate: null,
  safeCode: null
})
const countryJson = {
  China: [
    {
      type: "selector", //什么类型，selector | input
      require: true, // 是否必填
      placeHolder: "Province",
      key: "province", // 传给后端的key
      emuList: [
        //如果是selector，emuList就是下拉项的数据
        {
          value: "hunan",
          label: "湖南",
        },
      ],
    },
  ],
  American: [
    {
      type: "input", //什么类型，selector | input
      require: true, // 是否必填
      placeHolder: "Region",
      key: "region", // 传给后端的key
    },
  ],
};

const payMethod = ref(1);
const orderList = ref([
  {
    description:
      "10 kinds vibration of frequency usb rechargeable male masturbator self-retractable masturbation cup adult sex products",
    orderCount: 85.0,
    count: 1,
  },
]);
</script>

<style lang="less" scoped>
.checkout-page-component {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  padding: 0 20px 30px;
  background: #fff;
  overflow: hidden auto;
  box-sizing: border-box;
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
      left: 20px;
      top: calc(50% - 10px);
      cursor: pointer;
    }
  }
  .margin30 {
    margin-top: 30px;
  }
  .details-container {
    padding-top: 30px;
    .first-title {
      margin-bottom: 30px;
      font-size: 16px;
      color: #000;
      font-weight: 600;
      font-family: inherit;
    }
    .ship-checkbox {
      font-family: inherit;
      font-size: 14px;
    }
    .notes-textarea {
      margin-top: 20px;
    }
    :deep(.var-form) {
      margin: 30px 0;
    }
  }
  .order-title {
    height: 30px;
    font-size: 14px;
    color: #000;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .border-line {
    border-bottom: 1px dashed #cfcaca;
  }
  .single-order {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
    .left-part {
      display: flex;
      .image-container {
        position: relative;
        .order-image {
          width: 55px;
          padding-left: 15px;
        }
        .delete-icon {
          position: absolute;
          left: -5px;
          top: -5px;
          cursor: pointer;
        }
      }
      .description {
        width: 45%;
        margin: 0 20px;
      }
      .count {
        display: flex;
        align-items: center;
      }
    }
    .right-part {
      font-size: 14px;
      font-weight: 700;
      color: #000;
      display: flex;
      align-items: center;
    }
  }
  .subtotal-line {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    .label {
      font-weight: 400;
      font-size: 13px;
    }
    .value {
      font-weight: 700;
      font-size: 13px;
    }
  }
  .pay-methods {
    background: #f7f7f7;
    padding: 20px;
    box-sizing: border-box;
    .paypal-tips {
      font-size: 12px;
      color: #949090;
    }
    .credit-container {
      background: #fff;
      padding: 15px;
      box-sizing: border-box;
      .credit-icons {
        display: flex;
        div {
          zoom: .5;
        }
        .visa {
          width: 61px;
          height: 40px;
          background: url('../../assets/images/cashier.png') 0 0;
        }
        .mastercard {
          width: 66px;
          height: 40px;
          background: url('../../assets/images/cashier.png');
        }
        .amex {
          width: 57px;
          height: 40px;
          background: url('../../assets/images/cashier.png');
        }
      }
    }
    .credit-form {
      
    }
  }
  .button-container {
    margin-top: 30px;
    width: 100%;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    background: rgb(241, 99, 52);
    cursor: pointer;
    border-radius: 8px;
    font-size: 16px;
    font-family: none;
    span {
      margin-left: 10px;
    }
  }
  .bottom-tips {
    margin-top: 20px;
    line-height: 20px;
    font-family: none;
    a {
      color: rgb(241, 99, 52);
    background-color: transparent;
    text-decoration: none;
    }
  }
}
</style>