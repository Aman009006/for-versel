import Keycloak from 'keycloak-js';
import { Message } from 'element-ui'

const keycloakId = 'hsag-admin-ui';
const initOptions = {
    url: 'https://keycloak-hsag.azurewebsites.net/auth',
    realm: keycloakId,
    clientId: keycloakId + '-frontend'
}

const keycloak = Keycloak(initOptions);
let initialized = false;

async function initKeyCloak() {
    let auth;
    try {
        if (!initialized) {
            auth = await keycloak.init();
            initialized = true;
        }
    } catch (e) {
        console.log(e);
    } finally {
        return auth;
    }
}

/**
 * @returns the token, if the user is already authenticated
 * through keycloak, the token will be set. Otherwise null will be returned.
 */
export async function getToken() {
    await initKeyCloak();
    return keycloak.token;
}

export default async function startKeycloakAuthentication() {
    const auth = await initKeyCloak();
    /**
     * @todo move the console - output to another position
     */
    if (!auth) {
        Message({
            message: 'Der Service ist aktuell nicht verfügbar',
            type: 'error'
        });
    } else {
        keycloak.login();
    }
}

// async function log() {
//     console.log(await getToken());
// }

// log();
