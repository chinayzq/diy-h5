<template>
  <div class="workbench-component" @click="clearActiveState">
    <div class="header-container">
      <div class="model-case-container" @click="brandAndModelShow = true">
        {{ `${currentModel} / ${currentCase}` }}
        <var-icon name="chevron-down" />
      </div>
      <div class="print-button" @click="printHandler">PRINT</div>
    </div>
    <div class="graph-container">
      <img
        style="z-index: 1"
        class="single-graph-image"
        :src="selectModeImage"
        alt=""
      />
      <img
        style="z-index: 2"
        class="single-graph-image"
        :src="selectCaseImage"
        alt=""
      />
      <div
        :style="{
          zIndex: 3,
          maskImage: `url(${selectMaskImage})`,
        }"
        class="mask-container"
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
          :src="selectModeImage"
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
          :class="['drag-image', item.active && 'drag-image-active']"
        >
          <img
            draggable="false"
            style="height: 100%; width: 100%"
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
            <!-- <span class="replace-icon"> Replace </span> -->
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
    </div>
    <NavigationBar @naviClick="navigationEvent" />

    <!-- sticker弹出框 -->
    <var-popup
      overlay-class="popup-custom-overlay"
      position="bottom"
      v-model:show="stickersShow"
    >
      <StickersDialog @close="stickersShow = false" />
    </var-popup>

    <!-- font弹出框 -->
    <var-popup
      overlay-class="popup-custom-overlay"
      position="bottom"
      v-model:show="fontShow"
    >
      <FontDialog />
    </var-popup>

    <!-- 手机品牌、型号弹框 -->
    <var-popup
      overlay-class="popup-custom-border"
      position="bottom"
      v-model:show="brandAndModelShow"
    >
      <BrandAndModelsDialog @nextStep="nextStepHandler" />
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
      />
    </var-popup>

    <!-- Print弹窗 -->
    <var-popup
      overlay-class="popup-custom-border"
      position="bottom"
      v-model:show="printDialogShow"
    >
      <PrintDialog @close="printDialogClose" />
    </var-popup>

    <!-- PC - tempaltes -->
    <TemplateSideComponent />
    <!-- PC - layers -->
    <GraphLayers />
  </div>
</template>

<script setup>
import { ref } from "vue";
import NavigationBar from "./components/navigationBar.vue";
import StickersDialog from "./components/stickersDialog.vue";
import FontDialog from "./components/fontDialog.vue";
import BrandAndModelsDialog from "./components/brandAndModelsDialog.vue";
import CaseDialog from "./components/caseDialog.vue";
import TemplateDialog from "./components/templateDialog.vue";
import TemplateSideComponent from "./components/templateSideComponent.vue";
import GraphLayers from "./components/graphLayers.vue";
import PrintDialog from "./components/printDialog.vue";
import { uuid } from "@/utils";

// 拖拽ICons
import DeleteIcon from "@/assets/images/drag_delete_icon.png";
import PlusIcon from "@/assets/images/drag_plus_icon.svg";
import ResizeIcon from "@/assets/images/drag_resize_icon.png";
import RotateIcon from "@/assets/images/drag_rotate_icon.svg";

// 选择的背景图 - temp
import selectMaskImage from "@/assets/images/mask_temp.webp";
const selectModeImage = ref("/src/assets/images/model_temp.png");
const selectCaseImage = ref("/src/assets/images/case_temp.png");

// 所有贴纸图片
const dragStickerList = ref([
  {
    id: "xxx1",
    url: "/src/assets/images/drag_temp.webp",
    height: 100,
    width: 100,
    top: 200,
    left: 50,
    rotate: 0,
    zIndex: 1001,
    active: false,
  },
]);

const currentModel = "iPhone 15 pro";
const currentCase = "Clear Impact Case - Black";
const navigationEvent = (type, file) => {
  console.log("type", type);
  switch (type) {
    case "stickers":
      stickersShow.value = true;
      break;
    case "font":
      fontShow.value = true;
      break;
    case "image":
      if (file) {
        console.log("file", file);
      }
      break;
    case "templates":
      templateDialogShow.value = true;
      break;
  }
};

const templateDialogShow = ref(false);
const templateDialogClass = ref("popup-custom-overlay-offset");
const templateDialogChange = () => {
  templateDialogClass.value = "popup-custom-border";
};
const templateDialogClose = () => {
  templateDialogClass.value = "popup-custom-overlay-offset";
};

const stickersShow = ref(false);

const fontShow = ref(false);

const brandAndModelShow = ref(false);

const caseDialogShow = ref(false);
const selectCaseList = ref([]);
const selectPhoneName = ref(null);
const nextStepHandler = (datas) => {
  selectCaseList.value = datas.caseList;
  selectPhoneName.value = datas.phoneName;
  console.log("selectCaseList.value", selectCaseList.value);
  brandAndModelShow.value = false;
  caseDialogShow.value = true;
};

const openModelDialog = () => {
  caseDialogShow.value = false;
  brandAndModelShow.value = true;
};

const printDialogShow = ref(false);
const printHandler = () => {
  printDialogShow.value = true;
};
const printDialogClose = () => {
  printDialogShow.value = false;
};

const addStickerToGraph = (url) => {
  dragStickerList.value.push({
    id: uuid(),
    url,
    height: 100,
    width: 100,
    top: 280,
    left: 100,
    zIndex: getMaxIndex(),
    active: false,
  });
};
const activeItem = (dragItem) => {
  clearActiveState();
  dragItem.active = true;
};
// 清除所有拖拽图形active状态
const clearActiveState = () => {
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
const eventTransfor = (event) => {
  if (event.touches) {
    return event.touches[0];
  }
  return event;
};

let currentItem = {};
// move事件处理
const moveHandler = (event) => {
  console.log(1111, draggingItem.start);
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
  const { url, height, width, top, left } = item;
  dragStickerList.value.push({
    id: uuid(),
    url,
    height,
    width,
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
  item.height = item.height + yDiff;
  item.width = item.width + xDiff;
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
  position: relative;
  height: 100%;
  background-color: #f9f5eb;
  .header-container {
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
      font-family: JostMedium;
    }
  }
  .graph-container {
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
    align-items: center;
    justify-content: center;
    .single-graph-image {
      position: absolute;
      width: 70%;
    }
    .mask-container {
      width: 70%;
      position: relative;
      -webkit-mask-size: cover;
      .container-image {
        width: 100%;
        height: 100%;
      }
      .drag-image {
        user-select: none;
        position: absolute;
        cursor: pointer;
        // background-image: url("../../../assets/images/login_background2.jpg");
        // background-size: 100% 100%;
        box-sizing: border-box;
        border: 1px solid #00000000;
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
      .drag-image-active {
        border: 1px solid #409eff;
      }
    }
  }
}
</style>