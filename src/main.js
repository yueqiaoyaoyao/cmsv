import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons'

import '@/assets/css/global.css'
const app = createApp(App)
for(let iconName in ElementPlusIconsVue){
    app.component(iconName,ElementPlusIconsVue[iconName])
}
app.use(ElementPlus).use(store).use(router).mount('#app')
