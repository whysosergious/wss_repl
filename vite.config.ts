import { Plugin, mergeConfig } from 'vite'
import dts from 'vite-plugin-dts'
import base from './vite.preview.config'
import fs from 'node:fs'
import path from 'node:path'

const genStub: Plugin = {
  name: 'gen-stub',
  apply: 'build',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'ssr-stub.js',
      source: `module.exports = {}`,
    })
  },
}

/**
 * Patch generated entries and import their corresponding CSS files.
 * Also normalize MonacoEditor.css
 */
const patchCssFiles: Plugin = {
  name: 'patch-css',
  apply: 'build',
  writeBundle() {
    // 1. MonacoEditor.css -> monaco-editor.css
    const outDir = path.resolve('dist')


    // 2. inject css imports to the files
    ;['vue-repl', 'vcm5-editor'].forEach((file) => {
      const filePath = path.resolve(outDir, file + '.js')
      const content = fs.readFileSync(filePath, 'utf-8')
      fs.writeFileSync(filePath, `import './${file}.css'\n${content}`)
    })
  },
}

export default mergeConfig(base, {
  plugins: [
    dts({
      rollupTypes: true,
    }),
    genStub,
    patchCssFiles,
  ],
  optimizeDeps: {
    // avoid late discovered deps
    include: [
      'typescript',
      'vue/server-renderer',
    ],
  },
  base: './',
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: {
        pocket: './src/index.ts',
        'vue-repl': './src/index.ts',
        // 'monaco-editor': './src/editor/MonacoEditor.vue',
        'vcm5-editor': './src/editor/Vcm5Editor.vue',
      },
      formats: ['es'],
      fileName: () => '[name].js',
    },
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js',
      },
      external: ['vue', 'vue/compiler-sfc'],
    },
  },
})
