<script lang="ts" setup>
import { useDialog } from '@/hooks/dialog'
import type { AlertProps } from '@/components/alert/types'
import { DialogType } from '@/types'

const { id, opened } = useDialog<AlertProps>(DialogType.Alert, {
  title: '提示',
  appendToBody: false,
  destroyed: false,
  message: '此操作在确认后不可逆，确认这样做吗？'
})

const { opened: opened2 } = useDialog<AlertProps>(DialogType.Alert, {
  title: '提示2',
  appendToBody: false,
  closed: [id],
  message: '此操作在确认后不可逆，确认这样做吗？'
})
</script>

<template>
  <div>
    <button @click="opened = !opened">click</button>
    <button @click="opened2 = !opened2">click2</button>
  </div>
</template>
