<script lang="ts" setup>
import { useDialog } from '@v3hooks/dialog'
import type { AlertProps } from '@/components/alert/types'
import { DialogType } from '@/types'

const { opened } = useDialog<AlertProps>(DialogType.Alert, {
  title: '提示',
  appendToBody: false,
  destroyed: false,
  message: '此操作在确认后不可逆，确认这样做吗？'
})
</script>

<template>
  <div>
    <button @click="opened = !opened">click</button>
  </div>
</template>
