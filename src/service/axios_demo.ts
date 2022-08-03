import axios from 'axios'

axios.defaults.baseURL = 'http://123.207.32.32:8000'
axios.defaults.timeout = 3000

// axios拦截器
// 请求拦截
// fn1:请求发送成功执行的函数
// fn2:请求发送失败执行的函数
// axios.interceptors.request.use(fn1, fn2)
axios.interceptors.request.use(
  (config) => {
    // 1.给请求添加token

    // 2.isLoading动画
    console.log('请求成功')
    return config
  },
  (err) => {
    console.log('请求发生错误')
    return err
  }
)

// 响应拦截
// fn1:数据响应成功
axios.interceptors.response.use(
  (res) => {
    console.log('服务器响应成功')
    return res
  },
  (err) => {
    console.log('服务器响应失败')
    return err
  }
)

// axios的实例
axios.get('/home/multidata').then((res) => {
  console.log(res.data)
})
