import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  proxy: {
    '/servers/': {
      target: 'http://baoming.boxinyao.com',
      changeOrigin: true,
      pathRewrite: { '^/servers': '' },
    },
  },
});
