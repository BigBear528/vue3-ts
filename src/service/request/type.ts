import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface DXRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any

  resopnseInterceptor?: (res: T) => T
  resopnseInterceptorCatch?: (error: any) => any
}

export interface DXRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: DXRequestInterceptors<T>
  showLoading?: boolean
}
