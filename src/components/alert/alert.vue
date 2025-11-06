<script setup lang="ts">
import type { AlertProps } from './types'

defineProps<AlertProps & { opened: boolean }>()
</script>

<template>
  <div class="read-the-docs" :style="{ display: opened ? 'block' : 'none' }">
    <p>{{ title }}</p>
    <p>{{ message }}</p>
    
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
