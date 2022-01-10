import {createApp} from "vue";
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routeConfig from './route-config';

const router = createRouter({
    history: createWebHistory(),
    routes: routeConfig,
});

createApp(App)
    .use(router)
    .mount('#app')
