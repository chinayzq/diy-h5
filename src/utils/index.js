import { useStore } from '@/stores';
import { getDynamicScript } from '@/api/workbench';
import Cookies from 'js-cookie';
// 获取assets静态资源
export const getAssetsFile = (url) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};

export function setLayout() {
  const store = useStore();
  if (store.client === 'PC') {
    document.body.classList.add('layout-PC');
  }
}
export function dealImageUrl(url) {
  return url.replace('?fileId=', '/');
}
export function getCookie(cname) {
  let name = cname + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
}

export function initGlableFilters(app) {
  app.config.globalProperties.$filters = {
    dateFormat(dat) {
      if (!dat) return '--';
      dat = new Date(dat);
      //获取年月日，时间
      const year = dat.getFullYear();
      const mon =
        dat.getMonth() + 1 < 10
          ? '0' + (dat.getMonth() + 1)
          : dat.getMonth() + 1;
      const data = dat.getDate() < 10 ? '0' + dat.getDate() : dat.getDate();
      const hour = dat.getHours() < 10 ? '0' + dat.getHours() : dat.getHours();
      const min =
        dat.getMinutes() < 10 ? '0' + dat.getMinutes() : dat.getMinutes();
      const seon =
        dat.getSeconds() < 10 ? '0' + dat.getSeconds() : dat.getSeconds();
      return (
        year + '-' + mon + '-' + data + ' ' + hour + ':' + min + ':' + seon
      );
    },
  };
}
export const orderTimeRender = (dat) => {
  if (!dat) return '--';
  dat = new Date(dat);
  const year = dat.getFullYear();
  const mon =
    dat.getMonth() + 1 < 10 ? '0' + (dat.getMonth() + 1) : dat.getMonth() + 1;
  const monMap = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };
  return `${monMap[mon]} ${mon},${year}`;
};
export const dateFormat = (dat) => {
  if (!dat) return '--';
  dat = new Date(dat);
  //获取年月日，时间
  const year = dat.getFullYear();
  const mon =
    dat.getMonth() + 1 < 10 ? '0' + (dat.getMonth() + 1) : dat.getMonth() + 1;
  const data = dat.getDate() < 10 ? '0' + dat.getDate() : dat.getDate();
  const hour = dat.getHours() < 10 ? '0' + dat.getHours() : dat.getHours();
  const min = dat.getMinutes() < 10 ? '0' + dat.getMinutes() : dat.getMinutes();
  const seon =
    dat.getSeconds() < 10 ? '0' + dat.getSeconds() : dat.getSeconds();
  return year + '-' + mon + '-' + data + ' ' + hour + ':' + min + ':' + seon;
};
export function getUrlParams(url) {
  url = window.location.href;
  // 通过 ? 分割获取后面的参数字符串
  let urlStr = url.split('?')[1];
  if (!urlStr) return {};
  // 创建空对象存储参数
  let obj = {};
  // 再通过 & 将每一个参数单独分割出来
  let paramsArr = urlStr.split('&');
  for (let i = 0, len = paramsArr.length; i < len; i++) {
    // 再通过 = 将每一个参数分割为 key:value 的形式
    let arr = paramsArr[i].split('=');
    obj[arr[0]] = arr[1];
  }
  return obj;
}
// 拼接图片地址
export function buildImageUrl(id) {
  if (id.includes('/diyadmin')) return id;
  return `/diyadmin/download?fileId=${id}`;
}
// 生成唯一的id
export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function setCookie() {
  if (!Cookies.get('colgifts_c_sid')) {
    Cookies.set('colgifts_c_sid', uuid());
  }
}
/** 判断客户端：Android，IOS，PC */
export function judgeClient() {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //判断是否是 android终端
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 iOS终端
  if (isAndroid) {
    return 'Android';
  } else if (isIOS) {
    return 'IOS';
  } else {
    return 'PC';
  }

  // 方法1
  // var system = {};
  // system.pingtai =
  //   /(Win32|Win16|WinCE|Mac68K|MacIntel|MacIntel|MacPPC|Linux mips64)/i.test(
  //     navigator.platform
  //   );
  // if (system.pingtai) {
  //   //电脑
  //   return 'PC';
  // } else {
  //   //手机
  //   return 'MOBILE';
  // }

  // 方法2
  // var system = {};
  // var p = navigator.platform;
  // system.win = p.indexOf("Win") == 0;
  // system.mac = p.indexOf("Mac") == 0;
  // if (system.win || system.mac) {//如果是电脑
  //   return 'PC'
  // } else { //如果是手机,
  //   return 'MOBILE'
  // }
}

/** 是否是刘海屏 */
export function isiPhoneX() {
  return (
    (judgeClient() === 'IOS' &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    (D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
    (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT) ||
    (D_HEIGHT === p12_HEIGHT && D_WIDTH === p12_WIDTH) ||
    (D_HEIGHT === p12_WIDTH && D_WIDTH === p12_HEIGHT) ||
    (D_HEIGHT === p12_MAX_HEIGHT && D_WIDTH === p12_MAX_WIDTH) ||
    (D_HEIGHT === p12_MAX_WIDTH && D_WIDTH === p12_MAX_HEIGHT)
  );
}

export function safeBottomHeight() {
  return isiPhoneX() ? 44 : 0;
}

export function safeTopHeight() {
  return isiPhoneX() ? 22 : 0;
}

export function statusBarHeight() {
  return judgeClient() === 'IOS' ? (isiPhoneX() ? 44 : 20) : 0;
}

export function setDynamicScript() {
  getDynamicScript().then((res) => {
    const scriptList = res.data;
    scriptList.forEach((item, index) => {
      var head = document.head || document.getElementsByTagName('head')[0];
      var range = document.createRange();
      range.selectNode(document.body);
      var documentFragment = range.createContextualFragment(item);
      head.appendChild(documentFragment);
    });
  });
}

var set_innerHTML = function (el, htmlCode) {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf('msie') >= 0 && ua.indexOf('opera') < 0) {
    htmlCode = '<div style="display:none">for IE</div>' + htmlCode;
    htmlCode = htmlCode.replace(/<script([^>]*)>/gi, '<script$1 defer="true">');
    el.innerHTML = htmlCode;
    el.removeChild(el.firstChild);
  } else {
    var el_next = el.nextSibling;
    var el_parent = el.parentNode;
    el_parent.removeChild(el);
    el.innerHTML = htmlCode;
    if (el_next) el_parent.insertBefore(el, el_next);
    else el_parent.appendChild(el);
  }
};
