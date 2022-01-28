import { init } from '@datadog/ui-extensions-sdk';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

init();

createApp(App).use(router).mount('#app');
