import Keycloak from 'keycloak-js';
import { Message } from 'element-ui'

const keycloakId = 'hsag-admin-ui';
const initOptions = {
    url: 'https://keycloak-hsag.azurewebsites.net/auth',
    realm: keycloakId,
    clientId: keycloakId + '-frontend'
}

const keycloak = new Keycloak(initOptions);
let initialized = false;
let tokenAlreadySent = false;

export default class KeycloakUtils {
    /**
     * @private
     */
    static async initKeyCloak() {
        try {
            if (!initialized) {
                await keycloak.init({
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
        } finally { }
    }

    /**
     * @returns the token, if the user is already authenticated
     * through keycloak, the token will be set. Otherwise null will be returned.
     * The token will not be returned, when it was returned already once.
     * The token is stored in memory as long as the admin - UI remains open.
     * When the user would login with keycloak and immediately logout, the token would
     * lead to a login immediately after the logout. The user wouldn't be able to
     * logout properly as he gets logged in everytime he logs out.
     */
    static async getToken() {
        if (!tokenAlreadySent) {
            await KeycloakUtils.initKeyCloak();
            tokenAlreadySent = true;
            return keycloak.token;
        }
    }

    static async startKeycloakAuthentication() {
        await KeycloakUtils.initKeyCloak();
        if (!initialized) {
            Message({
                message: 'Der Service ist aktuell nicht verfügbar',
                type: 'error'
            });
        } else {
            keycloak.login();
        }
    }
}
