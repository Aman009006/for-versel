/**
 * the url of the backend based on the environment.
 * local url: http://localhost:3000/
 */
const backendUrl =
  process.env.VUE_APP_DEV_BACKEND === '1'
    ? 'http://localhost:3000/'
    : 'https://adminbackend.stadtwerk.bot/'
export default backendUrl

/**
 * the api of the backend that is only available when
 * the user is logged in and the token is valid.
 */
export const authorizedBackendUrl = backendUrl + 'authorized/'
