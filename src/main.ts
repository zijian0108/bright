import { createApp, defineAsyncComponent } from 'vue'
import './style.css'
import App from './App.vue'
import { registerBatch } from '@v3hooks/dialog';
import { DialogType } from './types'

registerBatch({
  [DialogType.Alert]: defineAsyncComponent(() => import("@/components/alert/alert.vue"))
});

createApp(App).mount('#app')
