import axios from '@/utils/axios.js';
export function getBrandAndModels(params) {
  return axios.get('/list/phonemodel', params);
}
// 通过手机型号获取手机壳信息
export function getPhoneColor(params) {
  return axios.get('/list/phonecolor', { params });
}
export function getStickers(params) {
  return axios.get('/list/stickers', params);
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
