import DXRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'
import { AxiosRequestHeaders } from 'axios'

const dxRequest = new DXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // console.log('请求成功的拦截')
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        ;(
          config.headers as AxiosRequestHeaders
        ).Authorization = `Bearer ${token}`
      }

      return config
    },
    requestInterceptorCatch(err) {
      // console.log('请求失败的拦截')
      return err
    },
    resopnseInterceptor(res) {
      // console.log('响应成功的拦截')
      return res
    },
    resopnseInterceptorCatch(err) {
      // console.log('响应失败的拦截')
      return err
    }
  }
})

export default dxRequest
