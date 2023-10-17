/**
 * brandName - 品牌名称
 * phoneName - 机型名称
 * modelUrl - 机型背景图
 * maskUrl  - 蒙板背景图
 * caseUrl  - 手机壳背景图
 * caseName - 手机壳名称
 */
const storageName = 'colgifts-storage';
export const setItem = (key, value) => {
  const currentStore = localStorage.getItem(storageName);
  if (currentStore) {
    let currentParse = JSON.parse(currentStore);
    currentParse[key] = value;
    localStorage.setItem(storageName, JSON.stringify(currentParse));
  } else {
    localStorage.setItem(
      storageName,
      JSON.stringify({
        [key]: value,
      })
    );
  }
};
export const removeItem = (key) => {
  const currentStore = localStorage.getItem(storageName);
  if (currentStore) {
    delete JSON.parse(currentStore)[key];
  }
};
export const clearStorage = (key) => {
  localStorage.removeItem(storageName);
};
export const getStorage = () => {
  const currentStore = localStorage.getItem(storageName);
  if (currentStore) {
    return JSON.parse(currentStore);
  } else {
    return null;
  }
};
