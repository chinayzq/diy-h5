import { ref, watch } from 'vue';
import { cloneDeep } from 'lodash';
const useUndoAndDo = () => {
  // 记录所有版本操作,初始化时是个空模板
  const operationList = ref([[]]);
  // 当前指针，初始化时为0
  let currentIndex = ref(0);
  // 是否能撤销
  let canUndo = ref(false);
  // 是否能前进
  let canDo = ref(false);
  // 撤销
  const undoHandler = () => {
    if (currentIndex.value === 0) {
      return;
    }
    currentIndex.value--;
    return clearActive(operationList.value[currentIndex.value]);
  };
  // 前进
  const doHandler = () => {
    if (currentIndex.value === operationList.value.length - 1) {
      return;
    }
    currentIndex.value++;
    return clearActive(operationList.value[currentIndex.value]);
  };
  // 清楚所有激活状态
  const clearActive = (list) => {
    list.forEach((item) => {
      item.active = false;
    });
    return list;
  };
  // 更新记录
  const updateHandler = (item) => {
    operationList.value.push(cloneDeep(item));
    currentIndex.value = operationList.value.length - 1;
  };
  watch(
    [() => operationList.value, () => currentIndex.value],
    () => {
      console.log('operationList.value', operationList.value);
      // 如果没有操作记录，那都不能点
      if (operationList.value.length === 1) {
        canUndo.value = false;
        canDo.value = false;
      } else {
        if (currentIndex.value === operationList.value.length - 1) {
          //          ↓
          // [0],[1],[2]
          canUndo.value = true;
          canDo.value = false;
        } else if (currentIndex.value === 0) {
          //  ↓
          // [0],[1],[2]
          canUndo.value = false;
          canDo.value = true;
        } else {
          //      ↓
          // [0],[1],[2]
          canUndo.value = true;
          canDo.value = true;
        }
      }
    },
    { deep: true }
  );
  return {
    updateHandler,
    undoHandler,
    doHandler,
    canUndo,
    canDo,
  };
};
export default useUndoAndDo;
