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
      redirect: '/workbench',
      component: Layout,
      children: [
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
          path: '/test',
          name: 'test',
          component: () => import('@/views/test/index.vue'),
          meta: { title: 'test' },
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  next();
});
export default router;
