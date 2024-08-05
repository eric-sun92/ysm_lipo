import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'venn.js': path.resolve(__dirname, './node_modules/venn.js/build/venn.js')
    }
  },
  base: '/', 
})
