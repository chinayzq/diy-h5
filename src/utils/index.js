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
