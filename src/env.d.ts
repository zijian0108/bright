import '@v3hooks/dialog'

export {}

declare module '@v3hooks/dialog' {
  interface Dialog {
    type: import('@/types').DialogType;
  }
}
