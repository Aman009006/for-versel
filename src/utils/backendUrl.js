
const backendUrl = "https://6b22-212-112-100-88.ngrok-free.app/"
export default backendUrl

/**
 * the api of the backend that is only available when
 * the user is logged in and the token is valid.
 */
export const authorizedBackendUrl = backendUrl + 'authorized/'
