import _ from 'lodash';
// 以1920px 底图为准开发页面
export const setDomFontSize = () => {
  let width = document.documentElement.clientWidth || document.body.clientWidth;
  let tempWidth = width <= 200 || width >= 1024 ? 375 : width;
  let fontsize = tempWidth / 100 + 'px';
  document.getElementsByTagName('html')[0].style['font-size'] = fontsize;
};

let setDomFontSizeDebounce = _.debounce(setDomFontSize, 400);
window.addEventListener('resize', setDomFontSizeDebounce); // 浏览器加入收缩监听防抖，重新计算rem配置
