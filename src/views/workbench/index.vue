<template>
  <div class="workbench-component" @click.stop="clearActiveState">
    <div class="header-container">
      <div class="model-case-container" @click.stop="brandAndModelShow = true">
        {{ `${selectPhoneName} / ${selectCaseName}` }}
        <var-icon name="chevron-down" />
      </div>
      <div class="print-button" @click.stop="printHandler">PRINT</div>
    </div>
    <div class="graph-container">
      <Loading v-show="graphLoading" :size="30" />
      <var-image
        style="z-index: 1"
        :class="['single-graph-image', fullScreen && 'single-graph-image-full']"
        :src="selectModelImage"
        lazy
        alt=""
      />
      <var-image
        style="z-index: 2"
        :class="['single-graph-image', fullScreen && 'single-graph-image-full']"
        :src="selectCaseImage"
        lazy
      />
      <div
        :style="{
          zIndex: 3,
          maskImage: `url(${selectMaskImage})`,
        }"
        :class="['mask-container', fullScreen && 'mask-container-full']"
        @mousemove="
          (event) => {
            moveHandler(event, item);
          }
        "
        @touchmove="
          (event) => {
            moveHandler(event, item);
          }
        "
        id="mask-container"
      >
        <!-- 该图只为撑起来mask容器 -->
        <img
          class="container-image"
          style="position: relative; z-index: -1"
          :src="selectModelImage"
          alt=""
        />
        <div
          @mousedown="
            (event) => {
              dragStartHandler(event, item);
            }
          "
          @touchstart="
            (event) => {
              dragStartHandler(event, item);
            }
          "
          @click.stop="activeItem(item)"
          @mouseup="eventEndHandler"
          @touchend="eventEndHandler"
          v-for="item in dragStickerList"
          :id="`drag_dom_${item.id}`"
          :key="item.id"
          :style="{
            height: `${item.height}px`,
            width: `${item.width}px`,
            top: `${item.top}px`,
            left: `${item.left}px`,
            transform: `rotate(${item.rotate}deg)`,
            zIndex: item.active ? 9999 : `${item.zIndex}`,
          }"
          :class="['drag-item', item.active && 'drag-item-active']"
        >
          <span
            class="drag-text"
            v-if="item.type === 'text'"
            :style="{
              color: item.color,
              fontFamily: item.fontFamily,
              fontWeight: item.fontWeight,
              fontStyle: item.fontStyle,
              textAlign: item.textAlign,
              textDecoration: item.textDecoration,
              fontSize: `${item.fontSize}px`,
              transform: rotateRender(item),
            }"
          >
            {{ item.content }}
          </span>
          <img
            v-else
            class="drag-image"
            draggable="false"
            :style="{
              transform: rotateRender(item),
            }"
            :src="item.url"
            alt=""
          />
          <template v-if="item.active">
            <img
              draggable="false"
              @click.stop="iconDeleteHandler(item)"
              :src="DeleteIcon"
              class="operation-icon delete-icon"
              alt=""
            />
            <span
              v-if="item.type !== 'text'"
              class="replace-icon"
              @click.stop="replaceHandler(item)"
            >
              Replace
            </span>
            <span v-else class="edit-icon" @click.stop="editHandler(item)">
              Edit
            </span>
            <img
              draggable="false"
              @click.stop="iconCopyHandler(item)"
              :src="PlusIcon"
              class="operation-icon plus-icon"
              alt=""
            />
            <div
              @mousedown.stop.prevent="
                (event) => {
                  resizeStart(event, item);
                }
              "
              @touchstart.stop.prevent="
                (event) => {
                  resizeStart(event, item);
                }
              "
              class="operation-icon resize-icon"
              :style="{
                transform: item.type === 'text' && 'rotate(137deg)',
              }"
            >
              <img draggable="false" :src="ResizeIcon" alt="" />
            </div>
            <img
              draggable="false"
              @mousedown.stop.prevent="
                (event) => {
                  rotateStart(event, item);
                }
              "
              @touchstart.stop.prevent="
                (event) => {
                  rotateStart(event, item);
                }
              "
              :src="RotateIcon"
              class="operation-icon rotate-icon"
              alt=""
            />
          </template>
        </div>
      </div>
      <!-- 右侧操作栏 -->
      <GraphSiderBar
        @fullScreen="graphFullScreen"
        @openDraftDialog="openDraftDialog"
        @setActive="setActiveById"
        :layers="dragStickerList"
      />

      <!-- 撤销操作 -->
      <UndoComponent />
    </div>
    <NavigationBar
      @naviClick="navigationEvent"
      :dragStickerList="dragStickerList"
    />

    <!-- sticker弹出框 -->
    <var-popup
      overlay-class="popup-custom-overlay"
      position="bottom"
      v-model:show="stickersShow"
    >
      <StickersDialog
        :stickersShow="stickersShow"
        @close="stickersShow = false"
        @stickerSelect="stickerSelectHandler"
      />
    </var-popup>

    <!-- layers弹出框 -->
    <var-popup
      overlay-class="popup-custom-overlay"
      position="bottom"
      v-model:show="layersDialogShow"
    >
      <LayersDialog
        @close="layersDialogShow = false"
        @layerEvent="layerChangeHandler"
      />
    </var-popup>

    <!-- flip弹出框 -->
    <var-popup
      overlay-class="popup-custom-overlay"
      position="bottom"
      v-model:show="flipDialogShow"
    >
      <FlipDialog
        @close="flipDialogShow = false"
        @flipEvent="flipChangeHandler"
      />
    </var-popup>

    <!-- font弹出框 -->
    <var-popup
      overlay-class="popup-custom-overlay"
      position="bottom"
      v-model:show="fontShow"
    >
      <FontDialog
        :currentTextId="currentTextId"
        :editItem="editItem"
        @close="fontShow = false"
        @fontChange="fontChangeHandler"
      />
    </var-popup>

    <!-- 手机品牌、型号弹框 -->
    <var-popup
      overlay-class="popup-custom-border"
      position="bottom"
      v-model:show="brandAndModelShow"
    >
      <BrandAndModelsDialog
        @close="brandAndModelShow = false"
        @nextStep="nextStepHandler"
      />
    </var-popup>

    <!-- 手机壳选择弹窗 -->
    <var-popup
      overlay-class="popup-custom-border"
      position="bottom"
      v-model:show="caseDialogShow"
    >
      <CaseDialog
        :dataset="selectCaseList"
        :selectPhoneName="selectPhoneName"
        @close="caseDialogShow = false"
        @phoneCaseSelect="phoneCaseSelectHandler"
        @openModelDialog="openModelDialog"
      />
    </var-popup>

    <!-- 模板弹窗 -->
    <var-popup
      @close="templateDialogClose"
      :overlay-class="templateDialogClass"
      position="bottom"
      v-model:show="templateDialogShow"
    >
      <TemplateDialog
        v-if="templateDialogShow"
        @change="templateDialogChange"
        @templateChange="templateChangeHandler"
        @clear="graphClearHandler"
      />
    </var-popup>

    <!-- Print弹窗 -->
    <var-popup
      overlay-class="popup-custom-border"
      position="bottom"
      v-model:show="printDialogShow"
    >
      <PrintDialog @close="printDialogClose" :previewImage="previewImage" />
    </var-popup>

    <!-- draft弹窗 -->
    <var-popup
      overlay-class="popup-custom-border"
      position="bottom"
      v-model:show="draftDialogShow"
    >
      <DraftDialog
        v-if="draftDialogShow"
        @close="draftDialogShow = false"
        @draftSelect="draftSelectHandler"
      />
    </var-popup>

    <!-- PC - tempaltes -->
    <TemplateSideComponent @templateChange="templateChangeHandler" />
    <!-- PC - layers -->
    <GraphLayers :layers="dragStickerList" @setActive="setActiveById" />
    <!-- continue dialog -->
    <var-overlay v-model:show="continueDialogShow">
      <ContinueDialog @clickEvent="countinueEvent" />
    </var-overlay>

    <!-- 该canvas节点用来导出模板图片渲染用 -->
    <canvas
      id="myCanvas"
      width="300"
      height="588"
      style="display: none"
    ></canvas>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import NavigationBar from "./components/navigationBar.vue";
import StickersDialog from "./components/stickersDialog.vue";
import FontDialog from "./components/fontDialog.vue";
import BrandAndModelsDialog from "./components/brandAndModelsDialog.vue";
import CaseDialog from "./components/caseDialog.vue";
import TemplateDialog from "./components/templateDialog.vue";
import TemplateSideComponent from "./components/templateSideComponent.vue";
import GraphLayers from "./components/graphLayers.vue";
import PrintDialog from "./components/printDialog.vue";
import GraphSiderBar from "./components/graphSiderBar.vue";
import DraftDialog from "./components/draftDialog.vue";
import UndoComponent from "./components/undoComponent.vue";
import LayersDialog from "./components/layersDialog.vue";
import FlipDialog from "./components/flipDialog.vue";
import ContinueDialog from "./components/continueDialog.vue";

import { uuid } from "@/utils";
import { getTemplateDetail, saveDraft } from "@/api/workbench";
import { exportAsImage } from "@/utils/domToImage";
import {
  setItem,
  removeItem,
  clearStorage,
  getStorage,
} from "@/utils/localStorage";
// 拖拽ICons
import DeleteIcon from "@/assets/images/drag_delete_icon.png";
import PlusIcon from "@/assets/images/drag_plus_icon.svg";
import ResizeIcon from "@/assets/images/drag_resize_icon.png";
import RotateIcon from "@/assets/images/drag_rotate_icon.svg";

onBeforeMount(() => {
  initLocalDatas();
});
const continueDialogShow = ref(false);
const initLocalDatas = () => {
  const currentLocal = getStorage();
  if (currentLocal) {
    continueDialogShow.value = true;
  }
};
const countinueEvent = (event) => {
  if (event === "continue") {
    graphLoading.value = true;
    const currentLocal = getStorage();
    const { phoneName, modelUrl, maskUrl, caseUrl, caseName, stickers } =
      currentLocal || {};
    selectPhoneName.value = phoneName;
    selectCaseName.value = caseName;
    selectMaskImage.value = maskUrl;
    selectModelImage.value = modelUrl;
    selectCaseImage.value = caseUrl;
    setTimeout(() => {
      graphLoading.value = false;
    }, 2000);
    dragStickerList.value = JSON.parse(stickers);
  } else {
    brandAndModelShow.value = true;
  }
  continueDialogShow.value = false;
};

// 选择的背景图 - temp
const selectMaskImage = ref(
  new URL("../../assets/images/mask_temp.webp", import.meta.url).href
);
const selectModelImage = ref(
  new URL("../../assets/images/model_temp.png", import.meta.url).href
);
const selectCaseImage = ref(
  new URL("../../assets/images/case_temp.png", import.meta.url).href
);

const rotateRender = (item) => {
  const { rotateY, rotateZ } = item;
  let styleStr = ``;
  if (rotateY) {
    styleStr += `rotateY(180deg)`;
  }
  if (rotateZ) {
    styleStr += `rotateY(180deg) rotateZ(180deg)`;
  }
  return styleStr;
};

// 所有贴纸图片
const dragStickerList = ref([
  // {
  //   id: "xxx1",
  //   url: "/src/assets/images/drag_temp.webp",
  //   height: 100,
  //   width: 100,
  //   top: 200,
  //   left: 50,
  //   rotate: 0,
  //   zIndex: 1001,
  //   rotateY: false, // 0 | 180
  //   rotateZ: false, // 0 | 180
  //   active: false,
  // },
  // {
  //   id: "xxx2",
  //   url: "/src/assets/images/drag_delete_icon.png",
  //   height: 100,
  //   width: 100,
  //   top: 250,
  //   left: 100,
  //   rotate: 0,
  //   rotateY: 0, // 0 | 180
  //   rotateZ: 0, // 0 | 180
  //   zIndex: 1002,
  //   active: false,
  // },
  // {
  //   type: "text",
  //   height: "auto",
  //   width: "auto",
  //   top: 200,
  //   left: 50,
  //   rotate: 0,
  //   zIndex: 1001,
  //   fontSize: 26,
  //   content: "test",
  //   color: "#1a4cec",
  //   fontFamily: "JostMedium",
  //   fontWeight: "normal", // normal | bold
  //   fontStyle: "normal", // normal | italic
  //   textAlign: "center", // left | center | right
  //   textDecoration: "none", //none | line-through
  //   active: true,
  // },
]);

const graphLoading = ref(false);

const navigationEvent = (type, file) => {
  console.log("type", type);
  switch (type) {
    case "stickers":
      stickersShow.value = true;
      break;
    case "font":
      fontShow.value = true;
      currentTextId.value = addTextToGraph();
      break;
    case "image":
      if (file) {
        addStickerToGraph(file, true);
      }
      break;
    case "imageReplace":
      if (file) {
        replaceImageUrl(file);
      }
      break;
    case "templates":
      templateDialogShow.value = true;
      break;
    case "layers":
      layersDialogShow.value = true;
      break;
    case "flip":
      flipDialogShow.value = true;
      break;
  }
};

const flipDialogShow = ref(false);
const flipChangeHandler = (key, flag) => {
  dragStickerList.value.forEach((item) => {
    if (item.active) {
      switch (key) {
        case "horizontal":
          item.rotateY = flag;
          break;
        case "vertical":
          item.rotateZ = flag;
          break;
      }
    }
  });
  // horizontal - transform: rotateY(180deg);
  // vertical - transform: rotateY(180deg) rotateZ(180deg);
};

const layersDialogShow = ref(false);
const layerChangeHandler = (key) => {
  dragStickerList.value.forEach((item) => {
    if (item.active) {
      switch (key) {
        case "top":
          item.zIndex = getMaxIndex();
          break;
        case "bottom":
          item.zIndex = getMinIndex();
          break;
        case "forward":
          item.zIndex++;
          break;
        case "backward":
          item.zIndex--;
          break;
      }
    }
  });
};

// fullscreen | layers Dialog
const fullScreen = ref(false);
const graphFullScreen = (flag) => {
  fullScreen.value = flag;
};

const draftDialogShow = ref(false);
const openDraftDialog = () => {
  draftDialogShow.value = true;
};
const draftSelectHandler = (item) => {
  graphLoading.value = true;
  const { templateData } = item || {};
  selectPhoneName.value = templateData.phoneName;
  selectCaseName.value = templateData.caseName;
  selectMaskImage.value = templateData.maskImage;
  selectModelImage.value = templateData.modelImage;
  selectCaseImage.value = templateData.caseImage;
  dragStickerList.value = templateData.basedata || [];
  setTimeout(() => {
    graphLoading.value = false;
  }, 2000);
  draftDialogShow.value = false;
};

const templateDialogShow = ref(false);
const templateDialogClass = ref("popup-custom-overlay-offset");
const templateDialogChange = () => {
  templateDialogClass.value = "popup-custom-border";
};
const templateDialogClose = () => {
  templateDialogClass.value = "popup-custom-overlay-offset";
};
const templateChangeHandler = (templateId) => {
  graphLoading.value = true;
  getTemplateDetail({ templateId })
    .then((res) => {
      if (res.code === 200) {
        dragStickerList.value = dragStickerList.value.concat(
          res.data.templateData.basedata
        );
      }
    })
    .finally(() => {
      setTimeout(() => {
        graphLoading.value = false;
      }, Math.min(200 * dragStickerList.value.length, 2000));
    });
};

const stickersShow = ref(false);
const stickerSelectHandler = (url) => {
  if (replaceItem.value.id) {
    dragStickerList.value.forEach((item) => {
      if (item.id === replaceItem.value.id) {
        item.url = replaceItem.value.url;
      }
    });
    stickersShow.value = false;
    replaceItem.value = {};
  } else {
    addStickerToGraph(url, true);
  }
};

const fontShow = ref(false);
const currentTextId = ref(null);
const fontChangeHandler = (params) => {
  const { type, content, fontFile } = params;
  dragStickerList.value.forEach((item) => {
    if (item.id === currentTextId.value) {
      item[type] = content;
    }
  });
  if (fontFile) {
    loadFonts(content, fontFile);
  }
};
const loadFonts = (cssValue, fontFile) => {
  if (document.fonts && !checkFont(cssValue)) {
    graphLoading.value = true;
    let fontFace = new FontFace(
      cssValue,
      `local('${cssValue}'),url('${fontFile}') format('ttf'),url('${fontFile}')`
    );
    fontFace
      .load()
      .then((loadedFontFace) => {
        document.fonts.add(loadedFontFace);
      })
      .finally(() => {
        graphLoading.value = false;
      });
  }
};
const checkFont = (name) => {
  let values = document.fonts.values();
  let isHave = false;
  let item = values.next();
  while (!item.done && !isHave) {
    let fontFace = item.value;
    if (fontFace.family == name) {
      isHave = true;
    }
    item = values.next();
  }
  return isHave;
};

const brandAndModelShow = ref(false);

const caseDialogShow = ref(false);
const selectCaseList = ref([]);
const selectPhoneName = ref("iPhone 14");
const selectPhoneCode = ref("IPHONE14");
const selectCaseName = ref("Clear Impact Case - Black");
const nextStepHandler = (datas) => {
  selectModelImage.value = datas.modelUrl;
  setItem("modelUrl", datas.modelUrl);
  selectMaskImage.value = datas.maskUrl;
  setItem("maskUrl", datas.maskUrl);
  selectCaseList.value = datas.caseList;
  selectPhoneName.value = datas.phoneName;
  selectPhoneCode.value = datas.phoneCode;
  setItem("phoneName", datas.phoneName);
  setItem("brandName", datas.brandName);
  brandAndModelShow.value = false;
  caseDialogShow.value = true;
};
const phoneCaseSelectHandler = (url, caseName) => {
  graphLoading.value = true;
  selectCaseImage.value = url;
  setItem("caseUrl", url);
  selectCaseName.value = caseName;
  setItem("caseName", caseName);
  caseDialogShow.value = false;
  setTimeout(() => {
    graphLoading.value = false;
  }, 1000);
};

const openModelDialog = () => {
  caseDialogShow.value = false;
  brandAndModelShow.value = true;
};

const printDialogShow = ref(false);
const previewImage = ref(null);
const printHandler = async () => {
  previewImage.value = null;
  printDialogShow.value = true;
  setGraphDomsScale(1, true);
  setItem("stickers", JSON.stringify(dragStickerList.value));
  const templateUrl = await exportAsImage("mask-container", {
    mask: selectMaskImage.value,
    model: selectModelImage.value,
    caseImage: selectCaseImage.value,
  });
  previewImage.value = templateUrl;
  setGraphDomsScale(0.65, false);
  saveAsDraft(templateUrl);
};
const printDialogClose = () => {
  printDialogShow.value = false;
};
// 渲染的时候隐藏画布大图、调整scale
const setGraphDomsScale = (scale, hideFlag) => {
  if (hideFlag) {
    document.getElementsByClassName("graph-container")[0].style.top = "50%";
  }
  document.getElementsByClassName(
    "single-graph-image"
  )[0].style.transform = `scale(${scale})`;
  document.getElementsByClassName(
    "single-graph-image"
  )[1].style.transform = `scale(${scale})`;
  document.getElementsByClassName(
    "mask-container"
  )[0].style.transform = `scale(${scale})`;
  if (!hideFlag) {
    document.getElementsByClassName("graph-container")[0].style.top = "0";
  }
};
const saveAsDraft = (templateUrl) => {
  const params = {
    description: "", //暂时没有描述
    phoneCode: selectPhoneCode.value,
    templateData: {
      basedata: dragStickerList.value,
      modelImage: selectModelImage.value,
      caseImage: selectCaseImage.value,
      maskImage: selectMaskImage.value,
      phoneName: selectPhoneName.value,
      caseName: selectCaseName.value,
    },
    templateUrl,
  };
  saveDraft(params);
};

const setActiveById = (id) => {
  dragStickerList.value.forEach((item) => {
    item.active = item.id === id;
  });
  console.log("dragStickerList.value", dragStickerList.value);
};
const clearAllActive = () => {
  dragStickerList.value.forEach((item) => {
    item.active = false;
  });
};
const addStickerToGraph = (url, activeFlag = false) => {
  clearAllActive();
  dragStickerList.value.push({
    id: uuid(),
    url,
    height: 100,
    width: 100,
    top: 280,
    left: 100,
    rotate: 0,
    rotateY: false,
    rotateZ: false,
    zIndex: getMaxIndex(),
    active: activeFlag,
  });
};
const replaceImageUrl = (url) => {
  dragStickerList.value.forEach((item) => {
    if (item.active) {
      item.url = url;
      item.rotateY = false;
      item.rotateZ = false;
    }
  });
};
const addTextToGraph = () => {
  const id = uuid();
  dragStickerList.value.push({
    id,
    type: "text",
    height: "auto",
    width: "auto",
    top: 280,
    left: 100,
    rotate: 0,
    rotateY: false,
    rotateZ: false,
    zIndex: 1001,
    fontSize: 26,
    content: "",
    color: "#1a4cec",
    fontFamily: "JostMedium",
    fontWeight: "normal", // normal | bold
    fontStyle: "normal", // normal | italic
    textAlign: "center", // left | center | right
    textDecoration: "none", //none | lineThrough
    active: false,
  });
  return id;
};

const replaceItem = ref({});
const replaceHandler = (item) => {
  replaceItem.value.id = item.id;
  replaceItem.value.url = item.url;
  stickersShow.value = true;
};

const editItem = ref({});
const editHandler = (item) => {
  editItem.value = item;
  fontShow.value = true;
};

const graphClearHandler = () => {
  console.log("graphClearHandler");
  dragStickerList.value = [];
};
const activeItem = (dragItem) => {
  clearActiveState();
  dragItem.active = true;
};
// 清除所有拖拽图形active状态
const clearActiveState = () => {
  console.log("clearActiveState");
  dragStickerList.value.forEach((item) => {
    item.active = false;
  });
};
// 获取addStickerToGraph最大Index
const getMaxIndex = () => {
  if (dragStickerList.value.length) {
    let count = 0;
    dragStickerList.value.forEach((item) => {
      if (item.zIndex > count) {
        count = item.zIndex;
      }
    });
    return count + 1;
  } else {
    return 1000;
  }
};
// 获取addStickerToGraph最小Index
const getMinIndex = () => {
  if (dragStickerList.value.length) {
    let count = 10000;
    dragStickerList.value.forEach((item) => {
      if (item.zIndex < count) {
        count = item.zIndex;
      }
    });
    return count - 1;
  } else {
    return 999;
  }
};

const eventTransfor = (event) => {
  if (event.touches) {
    return event.touches[0];
  }
  return event;
};

let currentItem = {};
// move事件处理
const moveHandler = (event) => {
  if (draggingItem.start) {
    dragHandler(event, currentItem);
  }
  if (resizeObj.start) {
    resizeMove(event, currentItem);
  }
  if (rotateObj.start) {
    rotating(event, currentItem);
  }
};

// icon - 拖拽
const draggingItem = {
  x: 0,
  y: 0,
  start: false,
};
const dragHandler = (event, item) => {
  const { clientX, clientY } = eventTransfor(event);
  if (clientY === 0 || clientX === 0 || !draggingItem.start) return;
  const xDiff = clientX - draggingItem.x;
  const yDiff = clientY - draggingItem.y;
  draggingItem.x = clientX;
  draggingItem.y = clientY;
  item.top = item.top + yDiff;
  item.left = item.left + xDiff;
};
const dragStartHandler = (event, item) => {
  currentItem = item;
  console.log("currentItem", currentItem);
  draggingItem.start = true;
  const { clientX, clientY } = eventTransfor(event);
  draggingItem.x = clientX;
  draggingItem.y = clientY;
};
const dragEndHandler = () => {
  console.log("dragEnd");
  draggingItem.start = false;
};

// icon - 删除
const iconDeleteHandler = ({ id }) => {
  dragStickerList.value = dragStickerList.value.filter(
    (item) => item.id !== id
  );
};

// icon - 复制
const iconCopyHandler = (item) => {
  const { url, height, width, top, left, rotate, rotateY, rotateZ } = item;
  dragStickerList.value.push({
    id: uuid(),
    url,
    height,
    width,
    rotate,
    rotateY,
    rotateZ,
    top: top + 40,
    left: left + 40,
    zIndex: getMaxIndex(),
    active: false,
  });
};

// icon - 改变大小
const resizeObj = {
  start: false,
  x: 0,
  y: 0,
};
const resizeStart = (event, item) => {
  event.preventDefault();
  currentItem = item;
  const { clientX, clientY } = eventTransfor(event);
  resizeObj.start = true;
  resizeObj.x = clientX;
  resizeObj.y = clientY;
};
const resizeMove = (event, item) => {
  if (!resizeObj.start) return;
  const { clientX, clientY } = eventTransfor(event);
  const xDiff = clientX - resizeObj.x;
  const yDiff = clientY - resizeObj.y;
  resizeObj.x = clientX;
  resizeObj.y = clientY;
  // 如果是text类型，根据横向移动距离改变font-size
  if (currentItem.type === "text") {
    item.fontSize += xDiff;
  } else {
    item.height = item.height + yDiff;
    item.width = item.width + xDiff;
  }
};
const resizeEnd = () => {
  resizeObj.start = false;
};

// icon - 旋转
let rotateObj = {
  start: false,
  rotate: 0,
};
let pointA = {
  X: 0,
  Y: 0,
};
let pointB = {};
let pointC = {};
const rotateStart = (event, item) => {
  currentItem = item;
  rotateObj.start = true;
  // 计算元素中心点
  const { height, width, id } = item;
  const currentDom = document.getElementById(`drag_dom_${id}`);
  const { left, top } = currentDom.getBoundingClientRect();
  pointA.X = width / 2 + left;
  pointA.Y = height / 2 + top;
  // 记录起始坐标
  pointB.X = eventTransfor(event).pageX;
  pointB.Y = eventTransfor(event).pageY;
  // 计算元素中心点
  // pointA.X = event.pageX - width / 2;
  // pointA.Y = event.pageY - height / 2;
  // 记录已有旋转角度
  rotateObj.rotate = item.rotate;
};
const rotating = (event, item) => {
  if (!rotateObj.start) return;
  pointC.X = eventTransfor(event).pageX;
  pointC.Y = eventTransfor(event).pageY; // 获取结束点坐标
  // 计算出旋转角度
  const AB = {};
  const AC = {};
  AB.X = pointB.X - pointA.X;
  AB.Y = pointB.Y - pointA.Y;
  AC.X = pointC.X - pointA.X;
  AC.Y = pointC.Y - pointA.Y; // 分别求出AB,AC的向量坐标表示
  const direct = AB.X * AC.Y - AB.Y * AC.X; // AB与AC叉乘求出逆时针还是顺时针旋转
  const lengthAB = Math.sqrt(
      Math.pow(pointA.X - pointB.X, 2) + Math.pow(pointA.Y - pointB.Y, 2)
    ),
    lengthAC = Math.sqrt(
      Math.pow(pointA.X - pointC.X, 2) + Math.pow(pointA.Y - pointC.Y, 2)
    ),
    lengthBC = Math.sqrt(
      Math.pow(pointB.X - pointC.X, 2) + Math.pow(pointB.Y - pointC.Y, 2)
    );
  const cosA =
    (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) /
    (2 * lengthAB * lengthAC); //   余弦定理求出旋转角
  const angleA = Math.round((Math.acos(cosA) * 180) / Math.PI);
  let allA = 0;
  if (direct < 0) {
    allA = -angleA; //叉乘结果为负表示逆时针旋转， 逆时针旋转减度数
  } else {
    allA = angleA; //叉乘结果为正表示顺时针旋转，顺时针旋转加度数
  }
  console.log("allA", allA);
  // 如果上一次按下旋转已经有度数,需要加上上一次的度数
  if (rotateObj.rotate) {
    allA += rotateObj.rotate;
  }
  item.rotate = allA;
};

const rotateEnd = () => {
  rotateObj.start = false;
  rotateObj.rotate = 0;
  pointA = {};
  pointB = {};
  pointC = {};
  // currentItem = {};
};

const eventEndHandler = () => {
  rotateEnd();
  resizeEnd();
  dragEndHandler();
};
</script>
<style lang="less" scoped>
.workbench-component {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #f9f5eb;
  .header-container {
    z-index: 1;
    position: absolute;
    top: 5px;
    left: 0;
    height: 45px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    .model-case-container {
      border: 1px solid rgb(143, 142, 136);
      color: #333;
      border-radius: 25px;
      overflow: hidden;
      height: 30px;
      line-height: 30px;
      padding: 0 10px;
      display: flex;
    }
    .print-button {
      width: 90px;
      height: 30px;
      background-color: #d54492;
      color: #fff;
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
      font-family: "JostMedium";
    }
  }
  .graph-container {
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .single-graph-image {
      position: absolute;
      width: 300px;
      transform: scale(0.65);
    }
    .mask-container {
      width: 300px;
      transform: scale(0.65);
      position: relative;
      -webkit-mask-size: cover;
      .container-image {
        width: 100%;
        height: 100%;
      }
      .drag-item {
        user-select: none;
        position: absolute;
        cursor: pointer;
        // background-image: url("../../../assets/images/login_background2.jpg");
        // background-size: 100% 100%;
        box-sizing: border-box;
        border: 1px solid #00000000;
        .drag-text {
          display: inline-block;
          min-width: 100px;
          width: 100%;
          height: 100%;
        }
        .drag-image {
          width: 100%;
          height: 100%;
        }
        .operation-icon {
          cursor: pointer;
          height: 35px;
          width: 35px;
          position: absolute;
        }
        .delete-icon {
          left: -17.5px;
          top: -17.5px;
        }
        .replace-icon {
          display: inline-block;
          background: #ffffff;
          border-radius: 20px;
          padding: 5px 10px;
          color: #000;
          cursor: pointer;
          position: absolute;
          right: -33px;
          top: -18px;
          font-size: 14px;
        }
        .edit-icon {
          display: inline-block;
          background: #ffffff;
          border-radius: 20px;
          padding: 5px 10px;
          color: #000;
          cursor: pointer;
          position: absolute;
          right: -25px;
          top: -18px;
          font-size: 14px;
        }
        .plus-icon {
          left: -17.5px;
          bottom: -17.5px;
        }
        .resize-icon {
          right: -17.5px;
          bottom: -17.5px;
          background-color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: nw-resize;
          img {
            width: 25px;
            height: 25px;
          }
        }
        .rotate-icon {
          bottom: -50px;
          left: calc(50% - 17.5px);
        }
      }
      .drag-item-active {
        border: 1px solid #409eff;
      }
      .drag-item-horizontal {
        transform: rotateY(180deg);
      }
      .drag-item-vertical {
        transform: rotateY(180deg) rotateZ(180deg);
      }
    }
    .mask-container-full {
      transform: scale(0.9);
    }
    .single-graph-image-full {
      transform: scale(0.9);
    }
  }
}
</style>