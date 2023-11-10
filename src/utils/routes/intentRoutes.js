import { intentConstants } from '@/constants';
/**
 * @param permissionRoutes the permission-routes. You can get them in a component like this `this.$store.getters.permission_routes`
 * @returns all the routes, which represent intents.
 */
export function getSkillRoute(permissionRoutes) {
  return permissionRoutes.find((route) => route.name === intentConstants.intents)
}

/**
 * @param permissionRoutes the permission-routes. You can get them in a component like this `this.$store.getters.permission_routes`
 * @returns {{pathTitles: string[]; name: string}[]} the intents, which are new for the current user.
 */
export function getNewIntentRoutes(permissionRoutes) {
  const intentRoute = getSkillRoute(permissionRoutes)
  const intentRouteChildren = intentRoute.children
  const newIntentRoutes = []
  for (const intent of intentRouteChildren) {
    if (intent.meta.newIntent) {
      // the intent is marked as new intent.
      newIntentRoutes.push({
        name: intent.name,
        creationTimestamp: intent.meta.creationTimestamp,
        pathTitles: [
          intent.meta.intentGroup,
          intent.meta.title,
        ],
      })
    }
  }
  newIntentRoutes.sort((routeA, routeB) => {
    return new Date(routeA.creationTimestamp) >
      new Date(routeB.creationTimestamp)
      ? -1
      : 1
  })
  return newIntentRoutes
}
