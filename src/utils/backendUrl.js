
/**
 * the url of the backend based on the environment.
 */
const backendUrl = process.env.NODE_ENV === 'development' ? 'https://chatbot-adminui-dev.azurewebsites.net' : 'https://adminbackend.stadtwerk.bot/'
export default backendUrl

/**
 * the api of the backend that is only available when
 * the user is logged in and the token is valid.
 */
export const authorizedBackendUrl = backendUrl + 'authorized/'
