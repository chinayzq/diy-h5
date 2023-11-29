<template>
  <div class="checkout-page-component">
    <div class="title-line">
      <!-- <var-icon name="menu" class="menu-icon" /> -->
      <img src="@/assets/images/project_logo.png" alt="" />
    </div>
    <div class="details-container">
      <div class="first-title">Delivery</div>
      <!-- billing form start -->
      <var-form ref="formIns" scroll-to-error="start">
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
            v-model="formData.email"
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
            <var-option
              v-for="item in countryList"
              :label="item.label"
              :value="item.value"
              :key="item"
            />
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
            placeholder="city *"
            :rules="[(v) => !!v || 'city is required']"
            v-model="formData.city"
          />
          <var-input
            variant="outlined"
            size="small"
            placeholder="State *"
            :rules="[(v) => !!v || 'State is required']"
            v-model="formData.state"
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
        <var-form ref="shipFormIns" scroll-to-error="start">
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
              v-model="shipform.email"
            />
            <var-input
              variant="outlined"
              size="small"
              placeholder="Phone *"
              :rules="[(v) => !!v || 'Phone is required']"
              v-model="shipform.phone"
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
                :label="item.label"
                :value="item.value"
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
              placeholder="city *"
              :rules="[(v) => !!v || 'city is required']"
              v-model="shipform.city"
            />
            <var-input
              variant="outlined"
              size="small"
              placeholder="State *"
              :rules="[(v) => !!v || 'State is required']"
              v-model="shipform.state"
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
        v-for="(item, index) in productList"
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
            <!-- <var-icon name="close-circle-outline" class="delete-icon" /> -->
          </span>
          <div class="description">
            {{ item.description }}
          </div>
          <div class="count">
            {{ `X ${item.productCount}` }}
          </div>
        </div>
        <div class="right-part">
          {{ `$${item.extendJson.curPrice}` }}
        </div>
      </div>
      <div class="subtotal-line">
        <span class="label"> Subtotal </span>
        <span class="value"> ${{ subTotal }} </span>
      </div>
      <div class="subtotal-line border-line" style="padding-bottom: 20px">
        <span class="label"> Shipping </span>
        <span class="value"> {{ shipping }} </span>
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
          <div v-if="payMethod === 1" class="paypal-tips">
            Secure payment via PayPal.
          </div>
          <var-radio :checked-value="2"> Credit/Debit Payment </var-radio>
          <div class="credit-container" v-show="payMethod === 2">
            <div id="cardElement"></div>
            <div class="error-tips">
              {{ errorTips }}
            </div>
          </div>
        </var-radio-group>
      </div>
      <div @click="payHandler" class="button-container">
        <var-button
          :loading="submitLoading"
          loading-type="wave"
          block
          type="warning"
          ><var-icon name="lock" />Place Order ${{ subTotal }}</var-button
        >
        <!-- <var-icon name="lock" />
        <span>Place Order ${{ subTotal }}</span> -->
      </div>
      <p class="bottom-tips">
        Your personal data will be used to process your order, support your
        experience throughout this website, and for other purposes described in
        our
        <a
          href="https://www.memtoys.com/privacy-policy/"
          class="woocommerce-privacy-policy-link"
          target="_blank"
          >privacy policy</a
        >.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { checkout, payOrder, useePayToken } from "@/api/workbench";
import { useRouter } from "vue-router";
import { Snackbar } from "@varlet/ui";
import md5 from "md5";

const submitLoading = ref(false);
const useepay = UseePay({
  env: "sandbox",
  layout: "multiLine",
  // window.navigator.language,
  locale: "en",
  merchantNo: "500000000011183",
});
const errorTips = ref(null);
onMounted(() => {
  useepay.mount(document.getElementById("cardElement"));
  useepay.on("change", (valid, code, message) => {
    console.log("valid, code, message", valid, code, message);
    errorTips.value = message;
  });
  getFormDataFromLocal();
});

const shipDifferentAddress = ref(false);
const countryList = ref([
  {
    label: "China",
    value: "CN",
  },
  {
    label: "Japan",
    value: "JP",
  },
]);
const notesForOrder = ref(null);
const formIns = ref(null);
const shipFormIns = ref(null);
const formData = ref({
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  country: null,
  streetAddress: null,
  apartment: null,
  city: null,
  state: null,
  postcode: null,
});
const setFormDataToLocal = () => {
  localStorage.setItem("colgift-billing-form", JSON.stringify(formData.value));
  localStorage.setItem("colgift-shipping-form", JSON.stringify(shipform.value));
};
const getFormDataFromLocal = () => {
  try {
    const billingForm = localStorage.getItem(
      "colgift-billing-form",
      JSON.stringify(formData.value)
    );
    if (billingForm) {
      formData.value = JSON.parse(billingForm);
    }
    const shippingForm = localStorage.getItem(
      "colgift-shipping-form",
      JSON.stringify(shipform.value)
    );
    if (shippingForm) {
      shipform.value = JSON.parse(shippingForm);
    }
  } catch (error) {
    console.log("init local datas failed!");
  }
};
const shipform = ref({
  firstName: null,
  lastName: null,
  email: null,
  phone: null,
  country: null,
  streetAddress: null,
  apartment: null,
  city: null,
  state: null,
  postcode: null,
});
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
const productList = ref([]);
const subTotal = ref(0);
const shipping = ref(0);
const resourceInfo = ref({});
// get order details
const initDatas = () => {
  checkout().then((res) => {
    resourceInfo.value = res.data;
    // display productList & subtotal & shipping
    productList.value = res.data.productJson.map((item) => {
      const { phoneName, caseColor, extend1, extend2 } = item.extendJson;
      item.description = `${phoneName} - ${caseColor} ${extend1} - ${extend2}`;
      return item;
    });
    subTotal.value = res.data.paidPrice;
    shipping.value =
      res.data.shippingFree === 0
        ? "Free shipping"
        : `$${res.data.shippingFree}`;
  });
};
initDatas();

const router = useRouter();
const payHandler = async () => {
  setFormDataToLocal();
  // 支付状态校验
  if (submitLoading.value) {
    return;
  }
  // form表单必填校验
  let valid = await formIns.value.validate();
  if (!valid) return;
  if (shipDifferentAddress.value) {
    const shipFormValid = await shipFormIns.value.validate();
    if (!shipFormValid) return;
  }
  if (payMethod.value === 1) {
    // 如果是PayPal支付
    Snackbar.error("paypal api对接中！");
  } else {
    // 如果是信用卡支付
    useepay.validate(async (valid, code, message) => {
      if (valid) {
        submitLoading.value = true;
        const tokenRes = await useePayToken(buildTokenParams());
        const { data } = tokenRes || {};
        if (!data || !data?.token) {
          Snackbar.error("Failed to obtain payment token");
          return;
        }
        useepay.confirm(data.token, (resp) => {
          console.log("confirm callback:", resp);
          if (resp.success) {
            Snackbar.success("Transaction successful");
            saveOrderHandler();
          } else {
            Snackbar.error(data.message);
          }
          submitLoading.value = false;
        });
      } else {
        Snackbar.error("Please fill in the credit card information correctly");
      }
    });
  }
};
const saveOrderHandler = () => {
  const params = buildRequestParams();
  payOrder(params).then((res) => {
    if (res.code === 200) {
      router.push({
        path: "/orderDetail",
        query: {
          orderId: res.data,
        },
      });
    }
  });
};
const buildTokenParams = () => {
  const { country, email } = formData.value;
  let payload = {};
  payload["amount"] = subTotal.value;
  payload["autoRedirect"] = "false";
  payload["country"] = country;
  payload["currency"] = "USD";
  payload["deviceInfo"] = JSON.stringify({
    fingerPrintId: "设备指纹id",
    mac: "设备mac地址",
  });
  payload["echoParam"] = "echoParam";
  payload["notifyUrl"] = "http://gatewaytest.useepay.com/notifyV2u0";
  payload["orderInfo"] = JSON.stringify({
    subject: "order title",
    goodsInfo: productList.value,
    shippingAddress: shipform.value,
  });
  payload["redirectUrl"] = "http://192.168.1.56:8005/redirectV2u0";
  payload["terminalType"] = "WEB";
  payload["userInfo"] = JSON.stringify({
    userId: "",
    ip: "",
    email,
  });
  payload["payerInfo"] = JSON.stringify({
    paymentMethod: "credit_card",
    authorizationMethod: "cvv",
    billingAddress: formData.value,
  });
  return payload;
};
const buildRequestParams = () => {
  const { email, firstName, lastName, phone } = formData.value;
  const { originalPrice, paidPrice, shippingFree } = resourceInfo.value;
  return {
    description: notesForOrder.value,
    discountCode: null,
    discountPrice: null,
    originalPrice,
    paidPrice,
    productJson: productList.value,
    shippingFree,
    userDTO: {
      billingJson: formData.value,
      description: "",
      email,
      firstName,
      lastName,
      phone,
      shipAddressJson: shipform.value,
    },
  };
};

// MD5 加密测试
function getPayload() {
  let payload = {};
  payload["amount"] = "100";
  payload["appId"] = "memtoys.com";
  payload["autoRedirect"] = "false";
  payload["country"] = "JP";
  payload["currency"] = "USD";
  payload["deviceInfo"] = JSON.stringify({
    fingerPrintId: "设备指纹id",
    mac: "设备mac地址",
  });
  console.log("xxx1", payload["deviceInfo"]);
  payload["echoParam"] = "echoParam";
  payload["merchantNo"] = "500000000009501";
  payload["notifyUrl"] = "http://gatewaytest.useepay.com/notifyV2u0";
  payload["orderInfo"] = JSON.stringify({
    subject: "order title",
    goodsInfo: [
      {
        id: "商品编号",
        name: "商品名称",
        body: "商品描述",
        category: "商品类目",
        categoryTree: "商品类目树，不同级别类目使用”|”分割",
        brand: "商品品牌",
        quantity: 1,
        price: 1234,
        url: "商品url",
        sku: "商品sku",
        image: "商品图片url",
      },
    ],
    shippingAddress: {
      email: "haile1y@useepay.com",
      phoneNo: "123123",
      firstName: "Victor",
      lastName: "Yang",
      street: "Heathcoat House, 20 Savile Row",
      postalCode: "W1S 3PR",
      city: "London",
      state: "LND",
      country: "GB",
    },
  });
  console.log("xxx2", payload["orderInfo"]);
  payload["payerInfo"] = JSON.stringify({
    paymentMethod: "credit_card",
    authorizationMethod: "cvv",
    billingAddress: {
      houseNo: "El Gallo Giro(https://gallogiro.com/)",
      email: "hai1ley@useepay.com",
      phoneNo: "1235854433",
      firstName: "amber",
      lastName: "Yang",
      stlogreet: "7148 Pacific Blvd, Huntington Park, CA",
      postalCode: "90225",
      city: "Huntington Park",
      state: "CA",
      country: "MX",
      street: "street",
    },
  });
  console.log("xxx3", payload["payerInfo"]);
  payload["redirectUrl"] = "http://192.168.1.56:8005/redirectV2u0";
  payload["signType"] = "MD5";
  payload["terminalType"] = "WEB";
  payload["transactionExpirationTime"] = "1880";
  payload["transactionId"] = "test001";
  payload["transactionType"] = "authorization";
  payload["userInfo"] = JSON.stringify({
    userId: "victor1",
    ip: "103.25.65.178",
    email: "dynam1ic_3d@useepay.com",
  });
  console.log("xxx4", payload["userInfo"]);
  payload["version"] = "1.0";
  payload["sign"] = calcMD5(payload);
  // useePayToken(payload).then(res => {
  //   console.log('xxx1', res)
  // })
  // https://pay-gateway1.uat.useepay.com/cashier
  return payload;
}

function calcMD5(payload) {
  const data = Object.keys(payload)
    .sort()
    .reduce((obj, key) => {
      obj[key] = payload[key];
      return obj;
    }, {});
  var str = "";
  Object.keys(data).forEach((key) => {
    if (data[key] != "" && key != "sign") {
      str = str + key + "=" + data[key] + "&";
    }
  });
  str =
    str +
    "pkey=" +
    "GH3VceBRSQdvYpo3eLiQ4xPrqHFiSyqVmffh2337LTZhx7l1mkMVI7VwzNK3DS5wufzIU05iB7BcXWMeb5B4oZ0Z15c0F7tveL83Le6TURqb1nnPwnUvWb7Io0qDYN1U";
  console.log("xxx-sign", str);
  return md5(str);
}
// console.log("xxx5", getPayload());
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
      left: 0;
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
          // padding-left: 15px;
        }
        // .delete-icon {
        //   position: absolute;
        //   left: -5px;
        //   top: -5px;
        //   cursor: pointer;
        // }
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
          zoom: 0.5;
        }
        .visa {
          width: 61px;
          height: 40px;
          background: url("../../assets/images/cashier.png") 0 0;
        }
        .mastercard {
          width: 66px;
          height: 40px;
          background: url("../../assets/images/cashier.png");
        }
        .amex {
          width: 57px;
          height: 40px;
          background: url("../../assets/images/cashier.png");
        }
      }
      .error-tips {
        position: relative;
        top: -25px;
        color: #ff0000;
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
    button {
      height: 100%;
      background: rgb(241, 99, 52);
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
