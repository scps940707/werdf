import { createApp } from 'vue';
import './style.css';
import 'view-ui-plus/dist/styles/viewuiplus.css';
import './werdf.scss';
// import App from './App.vue';
import WerdfApp from './WerdfApp.vue';
import { router } from '@/routes/route';

createApp(WerdfApp).use(router).mount('#app');
// TODO createApp(Werdf)
