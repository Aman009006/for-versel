import { paths } from '@/constants';
/**
 * @param permissionRoutes the permission-routes. You can get them in a component like this `this.$store.getters.permission_routes`
 * @returns all the routes, which represent intents.
 */
export function getSkillRoute(permissionRoutes) {
  return permissionRoutes.find((route) => route.path === paths.intents)
}

/**
 * @param permissionRoutes the permission-routes. You can get them in a component like this `this.$store.getters.permission_routes`
 * @returns {{pathTitles: string[]; name: string}[]} the intents, which are new for the current user.
 */
export function getNewIntentRoutes(permissionRoutes) {
  const skillRoutes = getSkillRoute(permissionRoutes)
  const skillRouteChildren = skillRoutes.children
  const newIntentRoutes = []
  for (const skillRoute of skillRouteChildren) {
    if (skillRoute.children?.length > 0) {
      skillRoute.children.forEach((intentRoute) => {
        if (intentRoute.meta.newIntent) {
          // the intent is marked as new intent.
          newIntentRoutes.push({
            name: intentRoute.name,
            creationTimestamp: intentRoute.meta.creationTimestamp,
            pathTitles: [
              skillRoutes.meta.title,
              skillRoute.meta.title,
              intentRoute.meta.title,
            ],
          })
        }
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
