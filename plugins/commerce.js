import Commerce from '@chec/commerce.js';
import Vue from 'vue';

Vue.prototype.$commerce = new Commerce(
  process.env.NUXT_ENV_CHEC_PUBLIC_API_KEY,
  true
);
