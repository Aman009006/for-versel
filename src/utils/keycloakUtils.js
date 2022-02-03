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
            auth = await keycloak.init({
                /**
                 * This option is mandatory, even if the options suggests that
                 * the option is optional. Currently an error - message is printed
                 * when the option is skipped.
                 * @see https://github.com/keycloak/keycloak/issues/8952
                 */
                messageReceiveTimeout: 10000
            });
            initialized = true;
        }
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
    await initKeyCloak();
    if (!initialized) {
        Message({
            message: 'Der Service ist aktuell nicht verfügbar',
            type: 'error'
        });
    } else {
        keycloak.login();
    }
}

/**
 * @todo remove this log..
 */
async function log() {
    console.log(await getToken());
}

log();
