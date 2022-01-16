import { createApp } from 'vue';
import ProgressBar from './progress.vue';

const app = createApp(ProgressBar);

app.config.globalProperties.$bar = createApp(ProgressBar).$mount();

document.body.appendChild(app.config.globalProperties.$bar.$el);
