import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
// import tailwindcss from '@tailwindcss/vite';
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    outDir : "../dist/webview",
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'MyLib',
      // the proper extensions will be added
      fileName: 'bundle',
    },
    minify:"terser",
  },
  plugins: [
    svelte(),
    // tailwindcss(),
  ],
});