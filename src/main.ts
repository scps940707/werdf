import { createApp } from 'vue';
import './style.css';
import './werdf.css';
// import App from './App.vue';
import WerdfApp from './WerdfApp.vue';
import { router } from '@/route/route';
import 'view-ui-plus/dist/styles/viewuiplus.css';

createApp(WerdfApp).use(router).mount('#app');
// TODO createApp(Werdf)
