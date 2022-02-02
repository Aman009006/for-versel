import Keycloak from 'keycloak-js';
import { Message } from 'element-ui'

export default async function startKeycloakAuthentication() {
    const keycloakId = 'hsag-admin-ui';
    const initOptions = {
        url: 'https://keycloak-hsag.azurewebsites.net/auth',
        realm: keycloakId,
        clientId: keycloakId + '-frontend',
        // check-sso / login-required
        onLoad: 'login-required'
    }

    const keycloak = Keycloak(initOptions);
    let auth
    try {
        auth = await keycloak.init({ onLoad: initOptions.onLoad });
    } finally {
        if (!auth) {
            Message({
                message: 'Der Service ist aktuell nicht verfügbar',
                type: 'error'
            });
        }
    }
}
