import Vcm5Editor from './Vcm5Editorditor.vue'
import MonacoEditor from './MonacoEditor.vue'

export type EditorComponentType = typeof Vcm5Editor | typeof MonacoEditor

export type PreviewMode = 'js' | 'css' | 'ssr'

export interface EditorProps {
  value: string
  filename: string
  readonly?: boolean
  mode?: PreviewMode
}

export interface EditorEmits {
  (e: 'change', code: string): void
}
