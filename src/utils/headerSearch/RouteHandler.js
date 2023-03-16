import SkillsWithIntentsDataGetterImpl from "@/utils/headerSearch/SkillsWithIntentsDataGetterImpl"
import path from "path-browserify";
import { headerSearch } from "@/constants";

export default class RouteHandler {
    #intentArrayIndexInTitle = headerSearch.intentArrayIndexInTitle;

    /**
     * @param {import('./SkillsWithIntents').default} skillsWithIntents
     */
    constructor(skillsWithIntents) {
        this.skillsWithIntents = skillsWithIntents;
    }

    /**
     * @param {import("vue-router").RouteRecord[]} routes
     * @param {string} basePath
     * @param {string[]} prefixTitle
     */
    generateRoutes(routes, basePath = "/", prefixTitle = []) {
        console.log(routes);
        let res = [];
        for (const route of routes) {
            // skip hidden routes
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

    /**
     * @param {import("vue-router").RouteRecord[]} routes
     */
    filterRoutes(routes) {
        const filteredRoutes = routes.filter(
            (route) => route.children == null
        )
        return this.setTitleAsIntentName(filteredRoutes);
    }

    /**
     * @private
     * @param {import("vue-router").RouteRecord[]} routes
     * @returns
     */
    setTitleAsIntentName(routes) {
        return routes.map(
            (route) => {
                route.intentName = route.title[this.#intentArrayIndexInTitle];
                return route;
            }
        )
    }
}