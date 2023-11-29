import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/views/layout/index.vue';
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
  next();
});
export default router;
