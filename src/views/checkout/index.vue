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
          <var-input
            v-if="specialItem(formData.country)"
            variant="outlined"
            size="small"
            :placeholder="`${specialItemValue(formData.country)} *`"
            :rules="[
              (v) => !!v || `${specialItemValue(formData.country)} is required`,
            ]"
            v-model="formData[specialItemValue(formData.country)]"
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
            <var-input
              v-if="specialItem(shipform.country)"
              variant="outlined"
              size="small"
              :placeholder="`${specialItemValue(shipform.country)} *`"
              :rules="[
                (v) =>
                  !!v || `${specialItemValue(shipform.country)} is required`,
              ]"
              v-model="shipform[specialItemValue(shipform.country)]"
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
              :src="`https://ossdiyphone.com/${item.templateUrl}`"
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
          {{ `$${countToFixed(item.extendJson.curPrice)}` }}
        </div>
      </div>
      <div class="subtotal-line">
        <span class="label"> Subtotal </span>
        <span class="value"> ${{ countToFixed(subTotal) }} </span>
      </div>
      <div class="subtotal-line">
        <span class="label"> Shipping </span>
        <span class="value"> {{ shippingLabel }} </span>
      </div>
      <div class="subtotal-line">
        <span class="label"> Savings </span>
        <span class="value">
          {{
            discountPrice === 0 ? "$0.00" : `-$${countToFixed(discountPrice)}`
          }}
        </span>
      </div>
      <div class="subtotal-line border-line" style="padding-bottom: 20px">
        <span class="label"> Coupon </span>
        <span class="value"> {{ discountCode || "-" }} </span>
      </div>
      <div class="pay-methods" v-show="paidTotal > 0">
        <var-radio-group v-model="payMethod" direction="vertical">
          <var-radio :checked-value="1" style="font-weight: bold"
            >PayPal</var-radio
          >

          <!-- <div v-if="payMethod === 1" class="paypal-tips">
            Secure payment via PayPal.
          </div> -->
          <div v-show="payMethod === 1">
            <img
              style="width: 100%; margin-bottom: 10px"
              src="@/assets/images/gateway_icon.svg"
              alt=""
            />
            <div id="paypal-button-container"></div>
            <p id="result-message" style="color: #ff0000"></p>
          </div>
          <var-radio :checked-value="2" style="font-weight: bold">
            Credit/Debit Payment
          </var-radio>
          <div class="credit-container" v-show="payMethod === 2">
            <div id="cardElement"></div>
            <!-- 1.
            <div id="checkout">
            </div> -->
            <!-- 2. -->
            <div id="payment-element">
              <!-- Elements will create form elements here -->
            </div>
            <div class="error-tips">
              {{ errorTips }}
            </div>
          </div>
        </var-radio-group>
      </div>
      <div
        @click="payHandler"
        class="button-container"
        v-show="payMethod === 2 || paidTotal === 0"
      >
        <var-button
          :loading="submitLoading"
          loading-type="wave"
          block
          type="warning"
          ><var-icon name="lock" />Place Order ${{
            countToFixed(paidTotal)
          }}</var-button
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
import {
  checkout,
  payOrder,
  useePayToken,
  createStripeSession,
  createPaymentIntent,
  createPaymentIntent2,
  updateStatusToProcess,
  getPaymentChannel,
} from "@/api/workbench";
import { useRouter } from "vue-router";
import { Snackbar } from "@varlet/ui";
import md5 from "md5";
import * as CountryList from "./country.js";
import { countToFixed } from "@/utils";

const countryList = ref(CountryList.default);
const specialItem = (country) => {
  for (let i = 0; i < countryList.value.length; i++) {
    const { special, value } = countryList.value[i] || {};
    if (value === country && special) {
      return true;
    }
  }
  return false;
};
const specialItemValue = (country) => {
  console.log("country", country);
  for (let i = 0; i < countryList.value.length; i++) {
    const { special, value, key } = countryList.value[i] || {};
    if (value === country && special) {
      console.log("key", key);
      return key;
    }
  }
};
const submitLoading = ref(false);
// useePay | stripe
// 1：useepay 2: stripe
const creditCardType = ref("1");
const useepay = UseePay({
  env: "production",
  layout: "multiLine",
  locale: window.navigator.language,
  merchantNo: "500000000011183",
});
const stripe = Stripe(
  "pk_live_51OHDvHF3YGXX14nuqBXxrHuWfNKwri4nSboLWf9rngy0W4Att1lJ8qwHQtZyStenrFpFmkYms1YyxVeyp2xaAFf600oE2mMcie"
);
const errorTips = ref(null);
onMounted(() => {
  getFormDataFromLocal();
  initPaypal();
});
const stripeClientSecret = ref(null);
const currentOrderId = ref(null);
const stripeElements = ref(null);
const stripeSign = ref(null);
const initCreditCard = async () => {
  const channelResult = await getPaymentChannel();
  if (channelResult.code !== 200) {
    console.log("get payment channel failed！");
  } else {
    creditCardType.value = channelResult.data;
  }
  switch (creditCardType.value) {
    case "1":
      useepay.mount(document.getElementById("cardElement"));
      useepay.on("change", (valid, code, message) => {
        errorTips.value = message;
      });
      break;
    case "2":
      const { data, code } = await createPaymentIntent({
        amount: 200,
      });
      if (code !== 200) {
        Snackbar.error("Stripe Pay initialization failed");
        return;
      }
      stripeClientSecret.value = data.client_secret;
      currentOrderId.value = data.orderId;
      stripeSign.value = data.id;
      const options = {
        clientSecret: data.client_secret,
        appearance: {
          theme: "stripe",
        },
      };
      const paymentElementOptions = {
        layout: "tabs",
      };
      const elements = stripe.elements(options);
      stripeElements.value = elements;
      const paymentElement = elements.create("payment", paymentElementOptions);
      paymentElement.mount("#payment-element");
      break;
  }
};
const initPaypal = () => {
  window.paypal
    .Buttons({
      async createOrder() {
        try {
          const response = await fetch("/api/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            body: JSON.stringify({
              cart: [
                {
                  id: "YOUR_PRODUCT_ID_TEST",
                  quantity: "YOUR_PRODUCT_QUANTITY_TEST",
                },
              ],
            }),
          });

          const orderData = await response.json();

          if (orderData.id) {
            return orderData.id;
          } else {
            const errorDetail = orderData?.details?.[0];
            const errorMessage = errorDetail
              ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
              : JSON.stringify(orderData);

            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error(error);
          resultMessage(
            `Could not initiate PayPal Checkout...<br><br>${error}`
          );
        }
      },
      async onApprove(data, actions) {
        try {
          const response = await fetch(`/api/orders/${data.orderID}/capture`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const orderData = await response.json();
          // Three cases to handle:
          //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          //   (2) Other non-recoverable errors -> Show a failure message
          //   (3) Successful transaction -> Show confirmation or thank you message

          const errorDetail = orderData?.details?.[0];

          if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
            // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
            return actions.restart();
          } else if (errorDetail) {
            // (2) Other non-recoverable errors -> Show a failure message
            throw new Error(
              `${errorDetail.description} (${orderData.debug_id})`
            );
          } else if (!orderData.purchase_units) {
            throw new Error(JSON.stringify(orderData));
          } else {
            // (3) Successful transaction -> Show confirmation or thank you message
            // Or go to another URL:  actions.redirect('thank_you.html');
            const transaction =
              orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
              orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
            resultMessage(
              `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`
            );
            console.log(
              "Capture result",
              orderData,
              JSON.stringify(orderData, null, 2)
            );
          }
        } catch (error) {
          console.error(error);
          resultMessage(
            `Sorry, your transaction could not be processed...<br><br>${error}`
          );
        }
      },
    })
    .render("#paypal-button-container");
};
const resultMessage = (message) => {
  const container = document.querySelector("#result-message");
  container.innerHTML = message;
};
const shipDifferentAddress = ref(false);
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
  cpf: null,
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
  cpf: null,
});

const payMethod = ref(1);
const productList = ref([]);
const subTotal = ref(0);
const shippingLabel = ref(0);
const shipping = ref(0);
const paidTotal = ref(0);
const resourceInfo = ref({});
const discountCode = ref(null);
const discountPrice = ref(0);

// get order details
const initDatas = () => {
  checkout()
    .then((res) => {
      resourceInfo.value = res.data;
      // display productList & subtotal & shipping
      productList.value = res?.data?.productJson
        ? res?.data?.productJson.map((item) => {
            const { phoneName, caseColor, extend1, extend2 } = item.extendJson;
            item.description = `${phoneName} - ${caseColor} ${extend1} - ${extend2}`;
            return item;
          })
        : [];
      subTotal.value = res.data.originalPrice - res.data.shippingFree;
      paidTotal.value = res.data.paidPrice;
      shipping.value = res.data.shippingFree;
      shippingLabel.value =
        res.data.shippingFree === 0
          ? "Free shipping"
          : `$${countToFixed(res.data.shippingFree)}`;
      discountCode.value = res.data.discountCode;
      discountPrice.value = res.data.discountPrice;
    })
    .finally(() => {
      if (paidTotal.value > 0) {
        initCreditCard();
      }
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
  if (paidTotal.value === 0) {
    freePayhandler();
    return;
  }
  if (payMethod.value === 1) {
    // 如果是PayPal支付
    Snackbar.error("paypal api对接中！");
  } else {
    // 信用卡 - useePay
    switch (creditCardType.value) {
      case "1":
        useepay.validate(async (valid, code, message) => {
          if (valid) {
            submitLoading.value = true;
            // 1.调接口生成token，失败后提示用户
            const tokenRes = await useePayToken(buildTokenParams());
            console.log("token callback:", tokenRes);
            const { data } = tokenRes || {};
            if (!data || !data?.token) {
              Snackbar.error("Failed to obtain payment token");
              submitLoading.value = false;
              return;
            }
            // 2.JSSDK confirm
            useepay.confirm(data.token, async (resp) => {
              console.log("confirm callback:", resp);
              if (resp.success) {
                const resultData = JSON.parse(resp.data);
                if (resultData.errorCode == "0000") {
                  // 3.保存订单
                  const params = buildRequestParams(
                    data.transactionId,
                    1,
                    "usee",
                    data.sign
                  );
                  payOrder(params).then((res) => {
                    if (res.code === 200) {
                      Snackbar.success("Transaction successful");
                      submitLoading.value = false;
                      setTimeout(() => {
                        router.push({
                          path: "/orderDetail",
                          query: {
                            orderId: res.data,
                          },
                        });
                      }, 1000);
                    }
                  });
                } else {
                  Snackbar.error(resultData.errorMsg);
                  submitLoading.value = false;
                }
              } else {
                Snackbar.error(data.message);
                submitLoading.value = false;
              }
            });
          } else {
            Snackbar.error(
              "Please fill in the credit card information correctly"
            );
            submitLoading.value = false;
          }
        });
        break;
      case "2":
        submitLoading.value = true;
        const { error } = await stripe.confirmPayment({
          elements: stripeElements.value,
          redirect: "if_required", // 不自动跳转需要设置 if_required
        });
        if (error) {
          Snackbar.error(error.message);
          submitLoading.value = false;
        } else {
          // 保存订单
          const params = buildRequestParams(
            currentOrderId.value,
            1,
            "stripe",
            stripeSign.value
          );
          payOrder(params).then((res) => {
            if (res.code === 200) {
              Snackbar.success("Transaction successful");
              submitLoading.value = false;
              setTimeout(() => {
                router.push({
                  path: "/orderDetail",
                  query: {
                    orderId: currentOrderId.value,
                  },
                });
              }, 1000);
            }
          });
        }
        break;
    }
  }
};
const freePayhandler = () => {
  const params = buildRequestParams(null, 2, null, null);
  payOrder(params).then((res) => {
    if (res.code === 200) {
      Snackbar.success("Transaction successful");
      submitLoading.value = false;
      setTimeout(() => {
        router.push({
          path: "/orderDetail",
          query: {
            orderId: res.data,
          },
        });
      }, 1000);
    }
  });
};

const saveOrderHandler = (orderId, payMethod) => {
  return new Promise((resolve) => {});
};
const buildTokenParams = () => {
  const { country, email } = formData.value;
  let payload = {};
  // payload["amount"] = paidTotal.value * 100;
  payload["amount"] = 2 * 100;
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
    shippingAddress: {
      email: formData.value.email,
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      phoneNo: formData.value.phone,
      street: formData.value.streetAddress,
      houseNo: formData.value.apartment,
      postalCode: formData.value.postcode,
      state: formData.value.state,
      city: formData.value.city,
      country: formData.value.country,
    },
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
    billingAddress: {
      email: formData.value.email,
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      phoneNo: formData.value.phone,
      street: formData.value.streetAddress,
      houseNo: formData.value.apartment,
      postalCode: formData.value.postcode,
      state: formData.value.state,
      city: formData.value.city,
      country: formData.value.country,
    },
  });
  return payload;
};
const buildRequestParams = (orderId, paymentMethod, payCatelog, sign) => {
  const { email, firstName, lastName, phone } = formData.value;
  const { originalPrice, paidPrice, shippingFree } = resourceInfo.value;
  return {
    orderId,
    description: notesForOrder.value,
    discountCode: discountCode.value,
    discountPrice: discountPrice.value,
    originalPrice,
    paidPrice,
    productJson: productList.value,
    shippingFree,
    paymentMethod,
    userDTO: {
      billingJson: formData.value,
      description: "",
      email,
      firstName,
      lastName,
      phone,
      shipAddressJson: shipform.value,
    },
    payExtendJson: payCatelog
      ? {
          sign, // 签名
          transactionId: orderId, //订单ID
          creditType: payCatelog, //支付渠道
        }
      : null,
  };
};
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
  :deep(.var-hover-overlay) {
    display: none;
  }
}
</style>
