import { paths } from '@/constants';
/**
 * @param permissionRoutes the permission-routes. You can get them in a component like this `this.$store.getters.permission_routes`
 * @returns all the routes, which represent intents.
 */
export function getSkillRoute(permissionRoutes) {
    return permissionRoutes.find(route => route.path === paths.skills);
}

/**
 * @param permissionRoutes the permission-routes. You can get them in a component like this `this.$store.getters.permission_routes`
 * @returns {{pathTitles: string[]; name: string}[]} the intents, which are new for the current user.
 */
export function getNewIntentRoutes(permissionRoutes) {
    const skillRoutes = getSkillRoute(permissionRoutes);
    const skillRouteChildren = skillRoutes.children;
    const newIntentRoutes = [];
    for (const skillRoute of skillRouteChildren) {
        if (skillRoute.children != null) {
            skillRoute.children.forEach(intentRoute => {
                if (intentRoute.meta.newIntent) {
                    // the intent is marked as new intent.
                    newIntentRoutes.push({
                        name: intentRoute.name,
                        pathTitles: [
                            skillRoutes.meta.title,
                            skillRoute.meta.title,
                            intentRoute.meta.title
                        ]
                    });
                }
            });
        }
    }
    return newIntentRoutes
}
