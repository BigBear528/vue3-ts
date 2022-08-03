import { createApp } from 'vue'

// import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.scss'

// import './service/axios_demo'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'
// import dxRequest from './service'

// createApp(App).mount('#app')

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(store)
// app.use(ElementPlus)
setupStore()
app.mount('#app')

// axios测试代码
/* interface DataType {
  data: any
  returnCode: string
  success: boolean
}

dxRequest
  .get<DataType>({
    url: '/home/multidata',
    interceptors: {
      requestInterceptor: (config) => {
        console.log('请求的拦截')
        return config
      }
    }
    // showLoading: false
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  }) */

// dxRequest
//   .post({
//     url: '/login',
//     data: {
//       name: 'coderwhy',
//       password: '123456'
//     }
//   })
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })
