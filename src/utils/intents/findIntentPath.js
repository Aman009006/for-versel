/**
 * @param {string} intent readable intent name
 * @returns {string} path to the intent
 */

export default function findIntentPath(intent) {
    const routes = this.$router.getRoutes();
    const findRoute = routes.find(route => route.meta.title === intent);
    if (findRoute !== undefined) {
        const resolvedRoute = this.$router.resolve(findRoute.path);
        return resolvedRoute.href;
    }
}