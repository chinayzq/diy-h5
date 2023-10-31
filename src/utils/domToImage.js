import html2Canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

/**
 * 1. 渲染带所有dragItem的底图 - source-over
 * 2. 渲染mask - destination-in（只保留新、旧图片重叠的新圆形区域，其余透明。）
 * 3. 渲染case - destination-over（将新图形放在旧图形之下。）
 * 4. 渲染model - destination-over（将新图形放在旧图形之下。）
 */
function dataURItoBlob(base64Data) {
  var byteString;
  if (base64Data.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(base64Data.split(',')[1]);
  else byteString = unescape(base64Data.split(',')[1]);
  var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

function drawSingle(myCanvas, image, type, width, height) {
  const operationMap = {
    mask: 'destination-in',
    model: 'destination-over',
    caseImage: 'destination-over',
  };
  return new Promise((resolve) => {
    let img = new Image();
    img.src = image;
    img.onload = () => {
      myCanvas.globalCompositeOperation = operationMap[type];
      myCanvas.drawImage(img, 0, 0, width, height);
      setTimeout(() => {
        resolve();
      }, 200);
    };
  });
  // };
}
function uploadPrintAndGetUrl() {
  return new Promise((resolve) => {
    console.log(2);
    const finalData = document
      .getElementById('myCanvas')
      .toDataURL('image/png');
    const blob = dataURItoBlob(finalData);
    //组装formdata
    var fd = new FormData();
    fd.append('file', blob); //fileData为自定义
    fd.append('fileName', 'print'); //fileName为自定义，名字随机生成或者写死，看需求
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', '/colgifts/upload');
    xmlHttp.send(fd);
    //ajax回调
    xmlHttp.onreadystatechange = (res) => {
      //todo  your code...
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        try {
          resolve(JSON.parse(xmlHttp.responseText).data);
        } catch (error) {}
      }
    };
  });
}

function uploadAndGetTemplateUrl() {
  return new Promise((resolve) => {
    const finalData = document
      .getElementById('myCanvas')
      .toDataURL('image/png');
    const blob = dataURItoBlob(finalData);
    //组装formdata
    var fd = new FormData();
    fd.append('file', blob); //fileData为自定义
    fd.append('fileName', 'template111'); //fileName为自定义，名字随机生成或者写死，看需求
    //ajax上传，ajax的形式随意，JQ的写法也没有问题
    //需要注意的是服务端需要设定，允许跨域请求。数据接收的方式和<input type="file"/> 上传的文件没有区别
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', '/colgifts/upload');
    // const currentToken = localStorage.getItem('diy-admin-token');
    // if (currentToken) {
    //   xmlHttp.setRequestHeader('token', currentToken); //设置请求header,按需设定，非必须
    // }
    // xmlHttp.setRequestHeader(
    //   'Content-Type',
    //   'multipart/form-data; boundary=----WebKitFormBoundaryr3jgTATix0AdBbiG'
    // );
    xmlHttp.send(fd);
    //ajax回调
    xmlHttp.onreadystatechange = (res) => {
      //todo  your code...
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        try {
          resolve(JSON.parse(xmlHttp.responseText).data);
        } catch (error) {}
      }
    };
  });
}
// 导出为图片
export function exportAsImage(domId, images) {
  debugger;
  // const containerDom = document.getElementsByClassName('container-image')[0];
  // const width = containerDom.naturalWidth * 0.65;
  // const height = containerDom.naturalHeight * 0.65;
  const containerDom = document.getElementsByClassName('mask-container')[0];
  const containerWidth = getComputedStyle(containerDom, null)['width'];
  const containerHeight = getComputedStyle(containerDom, null)['height'];
  const width = Number(containerWidth.substr(0, containerWidth.length - 2));
  const height = Number(containerHeight.substr(0, containerHeight.length - 2));
  const { mask, model, caseImage } = images;
  const canvasDom = document.getElementById('myCanvas');
  canvasDom.width = `${width}`;
  canvasDom.height = `${height}`;
  const myCanvas = canvasDom.getContext('2d');
  return new Promise((resolve) => {
    html2Canvas(document.querySelector(`#${domId}`), {
      width,
      height,
    }).then((canvas) => {
      let imageURL = canvas.toDataURL('image/png'); //canvas转base64图片
      let img = new Image();
      img.src = imageURL;
      img.onload = async () => {
        myCanvas.globalCompositeOperation = 'source-over';
        myCanvas.drawImage(img, 0, 0, width, height);
        if (mask) {
          await drawSingle(myCanvas, mask, 'mask', width, height);
        }
        if (caseImage) {
          await drawSingle(myCanvas, caseImage, 'caseImage', width, height);
        }
        if (model) {
          await drawSingle(myCanvas, model, 'model', width, height);
        }
        const templateUrl = await uploadAndGetTemplateUrl();
        resolve(templateUrl);
      };
    });
    // domtoimage.toPng(document.querySelector(`#${domId}`)).then((imgbase64) => {
    //   let img = new Image();
    //   img.src = imgbase64;
    //   img.onload = async () => {
    //     myCanvas.globalCompositeOperation = 'source-over';
    //     myCanvas.drawImage(img, 0, 0);
    //     if (mask) {
    //       await drawSingle(myCanvas, mask, 'mask');
    //     }
    //     if (caseImage) {
    //       await drawSingle(myCanvas, caseImage, 'caseImage');
    //     }
    //     if (model) {
    //       await drawSingle(myCanvas, model, 'model');
    //     }
    //     const url = await uploadAndGetTemplateUrl();
    //     resolve(url);
    //   };
    // });
  });
}

export const exportPrintImage = (domId, maskImages, width, height) => {
  const cavasDom = document.getElementById('myCanvasMax');
  cavasDom.width = `${width}`;
  cavasDom.height = `${height}`;
  let myCanvasMax = cavasDom.getContext('2d');
  return new Promise((resolve) => {
    html2Canvas(document.querySelector(`#${domId}`), {
      width,
      height,
    }).then((canvas) => {
      let imageURL = canvas.toDataURL('image/png'); //canvas转base64图片
      let img = new Image();
      img.src = imageURL;
      img.onload = async () => {
        myCanvasMax.globalCompositeOperation = 'source-over';
        myCanvasMax.drawImage(img, 0, 0, width, height);
        if (maskImages) {
          await drawSingleMax(myCanvasMax, maskImages, 'mask', width, height);
        }
        myCanvasMax.globalCompositeOperation = 'source-over';
        myCanvasMax.strokeStyle = '#000000';
        myCanvasMax.strokeRect(0, 0, width, height);
        const printUrl = await uploadPrintAndGetUrlMax();
        resolve(printUrl);
      };
    });
  });
};

function uploadPrintAndGetUrlMax() {
  return new Promise((resolve) => {
    const finalData = document
      .getElementById('myCanvasMax')
      .toDataURL('image/png');
    const blob = dataURItoBlob(finalData);
    //组装formdata
    var fd = new FormData();
    fd.append('file', blob); //fileData为自定义
    fd.append('fileName', 'print'); //fileName为自定义，名字随机生成或者写死，看需求
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', '/colgifts/upload');
    xmlHttp.send(fd);
    //ajax回调
    xmlHttp.onreadystatechange = (res) => {
      //todo  your code...
      if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
        try {
          resolve(JSON.parse(xmlHttp.responseText).data);
        } catch (error) {}
      }
    };
  });
}
function drawSingleMax(myCanvas, image, type, width, height) {
  const operationMap = {
    mask: 'destination-in',
    model: 'destination-over',
    caseImage: 'destination-over',
  };
  return new Promise((resolve) => {
    let img = new Image();
    img.src = image;
    img.onload = () => {
      myCanvas.globalCompositeOperation = operationMap[type];
      myCanvas.drawImage(img, 0, 0, width, height);
      setTimeout(() => {
        resolve();
      }, 200);
    };
  });
  // };
}
