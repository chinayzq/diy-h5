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
      redirect: '/model',
      component: Layout,
      children: [
        {
          path: '/model',
          name: 'model',
          component: () => import('@/views/model/index.vue'),
          meta: { title: 'Model' },
        },
        {
          path: '/sticker',
          name: 'sticker',
          component: () => import('@/views/sticker/index.vue'),
          meta: { title: 'sticker' },
        },
        {
          path: '/template',
          name: 'template',
          component: () => import('@/views/template/index.vue'),
          meta: { title: 'Template' },
        },
        {
          path: '/template/detail',
          name: 'templateDetail',
          component: () => import('@/views/template/model/detail.vue'),
          meta: {
            title: 'Template Detail',
            detail: true,
            parrentPath: '/template',
          },
        },
        {
          path: '/dictionary',
          name: 'dictionary',
          component: () => import('@/views/dictionary/index.vue'),
          meta: { title: 'Dictionary' },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: { title: 'Login' },
    },
  ],
});
router.beforeEach((to, from, next) => {
  next();
});
export default router;
