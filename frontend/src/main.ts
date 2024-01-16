import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from 'router';

// Packages
import axios from 'axios';
import Toast from 'vue-toastification';
import VOtpInput from 'vue3-otp-input';
import VueGtag from 'vue-gtag';
import { VueQueryPlugin } from 'vue-query';

// Plugins
import interceptors from 'plugins/interceptors';

// Event bus listeners
import './eventBus/listeners/index';
import { EventsPlugin } from './eventBus/events';

// Directives
import TrackVisibility from 'directives/trackVisibility';
import TrackClick from 'directives/trackClick';

const store = createPinia();
const app = createApp(App);

app.directive('track-visibility', TrackVisibility);
app.directive('track-click', TrackClick);

// vue toastification
const toastOptions: object = {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
};

// vue google analytics
const vueGTagOtions: object = {
  enabled: import.meta.env.PROD,
  bootstrap: import.meta.env.PROD,
  appName: import.meta.env.VITE_APP_NAME,
  config: { id: import.meta.env.VITE_GA_MEASUREMENT_ID },
  pageTrackerEnabled: false,
};

// api interceptors
interceptors(axios);

app
.use(store)
.use(router)
.use(Toast, toastOptions)
.use(VOtpInput)
.use(VueGtag, vueGTagOtions)
.use(VueQueryPlugin)
.use(EventsPlugin)
.mount('#app');
