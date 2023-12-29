<script setup lang="ts">
import Vcm5, { type Props } from '../EditorBundles/cm5/cm5.vue'
import { computed } from 'vue'
import type { EditorEmits, EditorProps } from './types'

defineOptions({
  editorType: 'vcm5',
})

const props = defineProps<EditorProps>()
const emit = defineEmits<EditorEmits>()

const onChange = (code: string) => {
  emit('change', code)
}

const modes: Record<string, Props['mode']> = {
  css: 'css',
  html: 'htmlmixed',
  js: {
    name: 'javascript',
  },
  json: {
    name: 'javascript',
    json: true,
  },
  ts: {
    name: 'javascript',
    typescript: true,
  },
  vue: 'htmlmixed',
}

const activeMode = computed(() => {
  const { mode: forcedMode, filename } = props
  const mode = modes[forcedMode || filename.split('.').pop()!]
  return filename.lastIndexOf('.') !== -1 && mode ? mode : modes.js
})
</script>

<template>
	<Vcm5 @change="onChange" :value="value" :mode="activeMode" />
</template>
