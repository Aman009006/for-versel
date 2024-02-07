
const backendUrl = 'https://9c00-193-34-225-104.ngrok-free.app/'
export default backendUrl

/**
 * the api of the backend that is only available when
 * the user is logged in and the token is valid.
 */
export const authorizedBackendUrl = backendUrl + 'authorized/'
