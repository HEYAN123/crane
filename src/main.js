import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router';
// import ElementUI from 'element-ui';
import ElementPlus from 'element-plus';
import 'element-ui/lib/theme-chalk/index.css';
import demoBlock from './components/demo-block';
import MainFooter from './components/footer';
import MainHeader from './components/header';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';
import App from './App.vue';
import routeConfig from './route.config';

const router = createRouter({
    history: createWebHistory(),
    routes: routeConfig,
});

createApp(App)
    .use(router)
    .use(ElementPlus)
    .component('demo-block', demoBlock)
    .component('main-footer', MainFooter)
    .component('main-header', MainHeader)
    .component('side-nav', SideNav)
    .component('footer-nav', FooterNav)
    .mount('#app')
