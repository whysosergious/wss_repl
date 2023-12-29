<script lang="ts">
import { BuilderBlock } from '../def/block.d'

import pocket from './pocket/mod'

const component = {
  name: 'PocketRoot',
}
export default {
  ...component,
}
</script>

<script setup lang="ts"></script>
<template>
  <PocketRoot :block="pocket" />
</template>
