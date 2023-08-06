import App from '@/App.vue';
import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: { name: 'main' } },
    { path: '/main', name: 'main', component: App },
  ],
});
