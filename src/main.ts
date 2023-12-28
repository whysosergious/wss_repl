import { createApp, h, watchEffect } from 'vue'
import { Repl, ReplStore } from '.'
import MonacoEditor from './editor/MonacoEditor.vue'
// import CodeMirrorEditor from '../src/editor/CodeMirrorEditor.vue'
;import CodeMirrorEditor from './editor/CodeMirrorEditor.vue'
(window as any).process = { env: {} }


const default_editor = CodeMirrorEditor

const App = {
  setup() {
    const query = new URLSearchParams(location.search)
    const store = ((window as any).store = new ReplStore({
      
      editors: {
        codemirror: {
          component: CodeMirrorEditor 
        },
        monaco: {
          component: MonacoEditor
        }
      },
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

    store.setVueVersion('3.3.13')
    store.setTypeScriptVersion('5.3.3')
    return () =>
      h(Repl, {



        store,
        theme: 'dark',
        editor: default_editor,
        // layout: 'vertical',
        ssr: true,
        sfcOptions: {
          script: {
            // inlineTemplate: false
          },
        },
        // showCompileOutput: false,
        // showImportMap: false
      })
  },
}

createApp(App).mount('#app')
