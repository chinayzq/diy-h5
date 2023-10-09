import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import Varlet from '@varlet/ui';
import '@varlet/ui/es/style';
import { initGlableFilters } from './utils';
// import 'amfe-flexible/index.js';
import { setDomFontSize } from './utils/dom';
import Loading from '@/components/Loading/index.vue';
const app = createApp(App).use(Varlet);
app.component('Loading', Loading);
// 全局过滤器
initGlableFilters(app);

setDomFontSize();
// element
import './assets/css/base.less';
import './assets/css/index.less';

// vuex
import vuex from '@/vuex';
app.use(vuex);
app.config.globalProperties.$vuex = vuex;

app.use(router);

app.mount('#app');
