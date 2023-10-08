import axios from '@/utils/axios.js';
export function getBrandAndModels(params) {
  return axios.get('/list/phonemodel', params);
}
export function getStickers(params) {
  return axios.get('/list/stickers', params);
}
