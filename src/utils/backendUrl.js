
/**
 * the url of the backend based on the environment.
 */
const backendUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://adminbackend.stadtwerk.bot/'
export default backendUrl
