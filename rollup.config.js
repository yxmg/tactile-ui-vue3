import esbuild from 'rollup-plugin-esbuild'
import vue from 'rollup-plugin-vue'
import scss from 'rollup-plugin-scss'
import dartSass from 'sass';
import { terser } from "rollup-plugin-terser"

export default {
  external: ['vue'],
  input: 'src/lib/index.ts',
  output: [
    {
      globals: {
        vue: 'Vue'
      },
      name: 'tinyUI',
      file: 'dist/lib/tiny-ui.js',
      format: 'umd',
      plugins: [terser()]
    },
    {
      name: 'tinyUI',
      file: 'dist/lib/tinyUI.esm.js',
      format: 'es',
      plugins: [terser()]
    }
  ],
  plugins: [
    scss({ include: /\.scss$/, sass: dartSass }),
    // ESBuild 2.5.0存在BUG，
    //  并没有将const activeNav = ref<HTMLDivElement>(null)转成 const activeNav = ref(null)
    esbuild({
      include: /\.[jt]s$/,
      minify: process.env.NODE_ENV === 'production',
      target: 'es2015'
    }),
    vue({ include: /\.vue$/, })
  ],
}