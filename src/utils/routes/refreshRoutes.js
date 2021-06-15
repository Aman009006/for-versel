import store from '@/store/index'

/**
 * refreshes all the routes in the admin - ui.
 * Can be used when a state of the routes (for example some information on the intents)
 * has changed.
 */
export default async function refreshRoutes() {
    const { roles } = await store.dispatch('user/getInfo');
    await store.dispatch('permission/pullIntentsAndSetRoutes', roles);
}
