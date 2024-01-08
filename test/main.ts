import { createApp, h, watchEffect } from 'vue'
import { Repl, ReplStore } from '../src'
// import MonacoEditor from '../src/editor/Vcm5Editor.vue'
import default_editor from '../src/editor/Vcm5Editor.vue'
;(window as any).process = { env: {} }

const App = {
  setup() {
    const query = new URLSearchParams(location.search)
    const store = ((window as any).store = new ReplStore({
      serializedState: location.hash.slice(1),
      showOutput: query.has('so'),
      outputMode: query.get('om') || 'preview',
      defaultVueRuntimeURL: import.meta.env.PROD
        ? undefined
        : `${location.origin}/src/vue-dev-proxy`,
      defaultVueServerRendererURL: import.meta.env.PROD
        ? undefined
        : `${location.origin}/src/vue-server-renderer-dev-proxy`,
    }))

    console.log(store)

    watchEffect(() => history.replaceState({}, '', store.serialize()))

    // store.setVueVersion('3.3.13')

    return () =>
      h(Repl, {
        store,
        theme: 'dark',
        editor: default_editor,
        // layout: 'vertical',
        ssr: true,
        sfcOptions: {
          script: {
            inlineTemplate: false,
          },
        },
        // showCompileOutput: false,
        // showImportMap: false
      })
  },
}

createApp(App).mount('#app')
