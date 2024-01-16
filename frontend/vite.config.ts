import { URL, fileURLToPath } from 'node:url';
import { resolve } from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import pages from 'vite-plugin-pages';
import svgLoader from 'vite-svg-loader';

function resolveSrc(_path) {
  return resolve(__dirname, _path);
}

export default defineConfig({
  plugins: [vue(), pages(), svgLoader()],
  server: {
    host: true, // needed for the Docker Container port mapping to work
    proxy: {},
    port: 8080,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      assets: resolveSrc('src/assets/'),
      components: resolveSrc('src/components/'),
      composables: resolveSrc('src/composables/'),
      directives: resolveSrc('src/directives/'),
      eventBus: resolveSrc('src/eventBus/'),
      forms: resolveSrc('src/forms/'),
      layouts: resolveSrc('src/layouts/'),
      middlewares: resolveSrc('src/middlewares/'),
      plugins: resolveSrc('src/plugins/'),
      router: resolveSrc('src/router/'),
      services: resolveSrc('src/services/'),
      stores: resolveSrc('src/stores/'),
      types: resolveSrc('src/types/'),
      utils: resolveSrc('src/utils/'),
      views: resolveSrc('src/views/'),
    },
    extensions: ['*', '.ts', '.js', '.vue', '.json', '.css', '.scss'],
  },
  test: {
    globals: true,
    environment: "jsdom",
  }
});
