import axios from '@/utils/axios.js';
import qs from 'qs';

export function getBrandAndModels(params) {
  return axios.get('/list/phonemodel', params);
}
// 通过手机型号获取手机壳信息
export function getPhoneColor(params) {
  return axios.get('/list/phonecolor', { params });
}
export function getStickers(params) {
  return axios.get('/list/stickers', { params });
}
export function getStickerList(params) {
  return axios.get('/sticker', { params });
}
export function getFontSize(params) {
  return axios.get('/list/fontsize', params);
}
export function getTemplateTypeList(params) {
  return axios.get('/list/templatetype', params);
}
export function getTemplateListByCode(params) {
  return axios.get('/listtemplate', { params });
}
export function getTemplateDetail(params) {
  return axios.get('/template', { params });
}
export function saveDraft(params) {
  return axios.post('/template/savedraft', params);
}
export function getDraftList(params) {
  return axios.get('/template/listdraft', { params });
}
export function saveProduct(params) {
  return axios.post('/saveproducct', params);
}
export function saveCart(params) {
  return axios.post('/savecard', params);
}
export function getProductList(params) {
  return axios.get('/listproduct', { params });
}
export function getCartList(params) {
  return axios.get('/listcard', { params });
}
export function getShipping(params) {
  return axios.get('/shipping', { params });
}
export function deleteProduct(productId) {
  return axios.delete(`/deleteproduct/${productId}`);
}
export function deleteCart(cartId) {
  return axios.delete(`/deletecard/${cartId}`);
}
export function couponAmount(params) {
  return axios.get('/couponamount', { params });
}
export function getPrivacy(params) {
  return axios.get('/privacy', { params });
}
export function getDynamicScript(params) {
  return axios.get('/seo/content', { params });
}
export function checkout(params) {
  return axios.get('/checkout', { params });
}
export function saveOrder(params) {
  return axios.post('/saveorder', params);
}
export function payOrder(params) {
  return axios.post('/payorder', params);
}
export function getArticleById(id) {
  return axios.post(`/detail/${id}`);
}
export function savecardmount(params) {
  return axios.post('/savecardmount', params);
}
export function getOrderDetailById(orderId) {
  return axios.get(`/order/${orderId}`);
}
export function getUserOrderList() {
  return axios.get(`/list/order`);
}
export function getUserInfo(params) {
  return axios.get('/user', { params });
}
export function imageUpload(params) {
  return axios.post('/upload', params);
}
export function sendPasswordMail(params) {
  return axios.post('/passwordmail', params);
}
export function setNewPassword(params) {
  return axios.post('/reset/password', params);
}
export function useePayToken(data) {
  return axios.post('/useepaytoken', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  });
}
export function loginRequest(params) {
  return axios.post('/login', params);
}
export function createStripeSession(params) {
  return axios.post('/createstripesession', params);
}
export function updateStatusToProcess(orderId) {
  return axios.post(`/order/processing/${orderId}`);
}
export function createPaymentIntent(params) {
  return axios.post('/createpaymentintent', params);
}
export function createPaymentIntent2(params) {
  return axios.post('/createpaymentintent2', params);
}
export function getPaymentChannel(params) {
  return axios.get('/payment/channel', params);
}
export function createPaypalOrder(params) {
  return axios.post('/createpaypalorder', params);
}
export function paypalCapture(id, params) {
  return axios.post(`/orders/${id}/capture`, params);
}
