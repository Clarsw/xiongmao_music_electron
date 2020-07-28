import axios from 'axios'
import qs from 'qs'

// 创建axios 实例
const request = axios.create({
  // baseURL: 'http://localhost:9080', // api的base_url
  // base url: 'http://localhost:8090/music/getData'
  baseURL: '',
  timeout: 10000, // 请求超时时间
  withCredentials: true, // 允许携带cookie
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer(params) {
    return qs.stringify(params, {
      arrayFormat: 'repeat'
    })
  }
})

// request 拦截器
request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// response 拦截器
request.interceptors.response.use(
  (response) => {
    const res = response.data
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request