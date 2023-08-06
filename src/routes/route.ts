import App from '@/App.vue';
import Supplier from '@/views/supplier.vue';
import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: { name: 'main' } },
    { path: '/main', name: 'main', component: App },
    { path: '/supplier', name: 'supplier', component: Supplier },
  ],
});
