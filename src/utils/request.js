import axios from 'axios'
import { ElMessage as Message } from 'element-plus'
import router from '@/router'

// create an axios instance
const service = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // here you can do something before request is sent
    return config
  },
  (error) => {
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
  (response) => {
    const res = response.data
    return res
  },
  (error) => {
    // the user does not see the error message that the user is not logged in if so
    if (!error.request.responseURL.includes('isLoggedIn')) {
      Message({
        /**
         * the backend should deliver a error - message for every error - request
         */
        message: error?.response?.data,
        type: 'error',
        duration: 5 * 1000,
      })
    }
    /**
     * make redirect at /login in case of error for all requests except for /isLoggedIn-request
     * Otherwise, there exists an endless loop in permision.js
     */
    if (
      !error.request.responseURL.includes('isLoggedIn') &&
      error.request.status === 401
    ) {
      // The user is not authenticated; therefore, get the user to the login - page
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default service
