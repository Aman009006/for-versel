import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // https://jwt.io/introduction/
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    return res
  },
  error => {
    Message({
      /**
       * the backend should deliver a error - message for every error - request
       */
      message: error?.response?.data,
      type: 'error',
      duration: 5 * 1000
    })
    if (error.request.status === 401) {
      // the user is not authenticated (that means that the token is invalid)
      // get the user to the login - page and remove the current token
      store.dispatch('user/resetToken')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default service
