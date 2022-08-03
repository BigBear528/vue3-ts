import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { DXRequestConfig, DXRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true

class DXRequest {
  instance: AxiosInstance
  interceptors?: DXRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: DXRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 每个实例的拦截(创建的axios对象)
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.resopnseInterceptor,
      this.interceptors?.resopnseInterceptorCatch
    )

    // 所有请求的拦截(所有的axios对象)
    this.instance.interceptors.request.use(
      (config) => {
        // 添加loding
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        // console.log('所有的请求拦截:请求成功的拦截')
        return config
      },
      (err) => {
        // console.log('所有的请求拦截:请求失败的拦截')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 移除loading
        this.loading?.close()

        // console.log('所有的请求拦截:响应成功的拦截')
        return res.data
      },
      (err) => {
        // console.log('所有的请求拦截:响应失败的拦截')
        return err
      }
    )
  }

  request<T>(config: DXRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 每次请求的拦截
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 每次响应的拦截
          if (config.interceptors?.resopnseInterceptor) {
            res = config.interceptors.resopnseInterceptor(res)
          }

          // 将showloading设置为true，不影响下一次请求
          this.showLoading = DEFAULT_LOADING

          resolve(res)
        })
        .catch((err) => {
          // 将showloading设置为true，不影响下一次请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: DXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: DXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: DXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: DXRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default DXRequest
