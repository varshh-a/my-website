// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       output: {
//         entryFileNames: 'assets/[name].js',
//         chunkFileNames: 'assets/[name].js',
//         assetFileNames: 'assets/[name].[ext]'
//       }
//     }
//   }
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  base: '/my-website/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});