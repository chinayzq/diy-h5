import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vitePluginImport from 'vite-plugin-babel-import';
import path from 'path';
import copy from 'rollup-plugin-copy';
import topLevelAwait from 'vite-plugin-top-level-await';
import DefineOptions from 'unplugin-vue-define-options/vite';
const px2rem = require('postcss-plugin-px2rem');
const px2remOptions = {
  rootValue: 3.75, //换算基数， 默认100 ,也就是1440px ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多少px了
  unitPrecision: 5, //允许REM单位增长到的十进制数字，其实就是精度控制
  // propWhiteList: [], // 默认值是一个空数组，这意味着禁用白名单并启用所有属性。
  // propBlackList: [], // 黑名单
  // exclude:false,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
  // selectorBlackList: [], //要忽略并保留为px的选择器
  // ignoreIdentifier: false, //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
  // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
  mediaQuery: false, //（布尔值）允许在媒体查询中转换px
  minPixelValue: 0, //设置要替换的最小像素值(3px会被转rem)。 默认 0
};
const baseUrl = {
  development: './',
  sit: './',
  beta: './',
  prod: './',
};
const getBaseByMode = (mode) => {
  console.log(
    `========================${mode}环境开始打包============================`
  );
  return baseUrl[mode];
};
export default ({ mode }) =>
  defineConfig({
    plugins: [
      vue(),
      DefineOptions(),
      topLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: '__tla',
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: (i) => `__tla_${i}`,
      }),
    ],
    base: getBaseByMode(mode),
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve(
              'src/assets/css/base.less'
            )}";`,
          },
          javascriptEnabled: true,
        },
      },
      postcss: {
        plugins: [px2rem(px2remOptions)],
      },
    },
    build: {
      outDir: 'diy-h5',
    },
    server: {
      hmr: true,
      proxy: {
        '/colgifts': {
          target: 'http://43.159.137.119:8084/',
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/saascloud/, 'saascloud'),
        },
      },
    },
  });
