import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import Varlet from '@varlet/ui';
import '@varlet/ui/es/style';
import { initGlableFilters } from './utils';
import { setDomFontSize } from './utils/dom';
import Loading from '@/components/Loading/index.vue';
import { setLayout, setDynamicScript } from '@/utils';
const app = createApp(App).use(Varlet);
const LoadingImage = new URL(`./assets/images/load.gif`, import.meta.url).href;
app.config.globalProperties.$LoadingImage = LoadingImage;
app.component('Loading', Loading);
// 设置动态script脚本
setDynamicScript();
// 全局过滤器
initGlableFilters(app);

setDomFontSize();
// element
import './assets/css/base.less';
import './assets/css/index.less';
import { createPinia } from 'pinia';
app.use(createPinia());

setLayout();
app.use(router);

app.mount('#app');
