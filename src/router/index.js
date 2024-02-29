import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/views/layout/index.vue';
import config from '~/config';
const currentGAId = config[import.meta.env.MODE].GAId;
const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  // workbench
  // gallery
  // settlement
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home/index.vue'),
          meta: { title: 'home' },
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/views/login/index.vue'),
          meta: { title: 'login' },
        },
        {
          path: '/userInfo',
          name: 'userInfo',
          component: () => import('@/views/userInfo/index.vue'),
          meta: { title: 'userInfo' },
        },
        {
          path: '/forget',
          name: 'forget',
          component: () => import('@/views/forget/index.vue'),
          meta: { title: 'forget' },
        },
        {
          path: '/reset',
          name: 'reset',
          component: () => import('@/views/reset/index.vue'),
          meta: { title: 'reset' },
        },
        {
          path: '/common',
          name: 'common',
          component: () => import('@/views/common/index.vue'),
          meta: { title: 'common' },
        },
        {
          path: '/gallery',
          name: 'gallery',
          component: () => import('@/views/gallery/index.vue'),
          meta: { title: 'gallery' },
        },
        {
          path: '/workbench',
          name: 'workbench',
          component: () => import('@/views/workbench/index.vue'),
          meta: { title: 'workbench' },
        },
        {
          path: '/settlement',
          name: 'settlement',
          component: () => import('@/views/settlement/index.vue'),
          meta: { title: 'settlement' },
        },
        {
          path: '/checkout',
          name: 'checkout',
          component: () => import('@/views/checkout/index.vue'),
          meta: { title: 'checkout' },
        },
        {
          path: '/orderDetail',
          name: 'orderDetail',
          component: () => import('@/views/orderDetail/index.vue'),
          meta: { title: 'orderDetail' },
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  // if (typeof gtag !== 'undefined') {
  //   console.log('gtag',gtag)
  //   gtag('config', 'G-0BYV4WHLQZ', {
  //     'page_path': to.path
  //   })
  // }
  next();
});
router.afterEach((to, from, next) => {
  // console.log('to',to)
  const currentTitle = to.fullPath.slice(1);
  document.title = currentTitle;
  if (window.gtag) {
    // console.log('window.gtag',window.gtag)
    // window.gtag('set', 'page', currentTitle)
    // window.gtag('send', 'pageview')
    // window.gtag('config', 'G-0BYV4WHLQZ', {
    //   page_title: currentTitle,
    //   page_path: to.path,
    //   page_location: location
    // })
    window.gtag('event', 'page_view', {
      // event_category: 'eventCategory',
      // event_label: 'eventLabel',
      // value: 'eventValue',
      send_to: currentGAId, //跟踪ID
    });
  }
  // console.log(window.ga)
});
export default router;
