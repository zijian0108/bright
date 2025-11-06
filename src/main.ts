import { createApp, defineAsyncComponent } from 'vue'
import './style.css'
import App from './App.vue'
import { registerBatch } from './hooks/dialog';
import { DialogType } from './types'

const Alert = defineAsyncComponent(() => import("@/components/alert/alert.vue"));

registerBatch({
  [DialogType.Alert]: Alert
});

createApp(App).mount('#app')
