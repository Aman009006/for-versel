import SkillsWithIntentsDataGetterImpl from "@/utils/headerSearch/SkillsWithIntentsDataGetterImpl"
import path from "path-browserify";

export default class RouteHandler {
    #intentArrayIndexInTitle = 2;

    constructor (skillsWithIntents) {
        this.skillsWithIntents = skillsWithIntents;
    }

    generateRoutes(routes, basePath = "/", prefixTitle = []) {
        let res = [];
        for (const route of routes) {
            // skip hidden router
            if (route.hidden) {
                continue;
            }

            const dataGetter = new SkillsWithIntentsDataGetterImpl(route, this.skillsWithIntents);
            const data = {
                path: path.resolve(basePath, route.path),
                title: [...prefixTitle],
                texts: dataGetter.getTexts(),
                intent: dataGetter.getTechnicalIntentName()
            };

            if (route.meta?.title) {
                data.title = [...data.title, route.meta.title];

                if (route.redirect !== "noRedirect") {
                    // only push the routes with title
                    // special case: need to exclude parent router without redirect
                    res.push(data);
                }
            }

            // recursive child routes
            if (route.children) {
                const tempRoutes = this.generateRoutes(
                    route.children,
                    data.path,
                    data.title
                );
                if (tempRoutes.length >= 1) {
                    res = [...res, ...tempRoutes];
                }
            }
        }
        return res;
    }

    filterRoutes(routes) {
        const filteredRoutes = routes
            .filter((route) => route.children == null)
            .map((route) => {
                route.intentName = route.title[this.#intentArrayIndexInTitle];
                return route;
            });
        return filteredRoutes;
    }
}