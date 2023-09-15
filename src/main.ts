import { createApp } from 'vue';
import './style.css';
import 'view-ui-plus/dist/styles/viewuiplus.css';
import './werdf.scss';
// import App from './App.vue';
import WerdfApp from './WerdfApp.vue';
import { router } from '@/routes/route';
// import { axiosInstance } from '@/axios.ts';

const app = createApp(WerdfApp).use(router).mount('#app');
// const app = createApp(WerdfApp).use(axiosInstance).use(router).mount('#app');
// app.provide('$axios', axios); // Providing to all components during app creation

// TODO createApp(Werdf)
