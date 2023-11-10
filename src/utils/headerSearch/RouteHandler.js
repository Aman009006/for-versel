import SkillsWithIntentsDataGetterImpl from "@/utils/headerSearch/SkillsWithIntentsDataGetterImpl"
import path from "path-browserify";
import { headerSearch } from "@/constants";

export default class RouteHandler {
    #intentArrayIndexInTitle = headerSearch.intentArrayIndexInTitle;

    /**
     * @param {import('./interfaces/SkillsWithIntents').default} skillsWithIntents
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
        let res = [];
        for (const route of routes) {
            // skip hidden routes
            if (route.hidden && !route.isIntents) {
                continue;
            }
            const data = this.getDataForRoute(route, basePath, prefixTitle);

            if (route.meta?.title) {
                if (route.meta.intent) {
                    data.title = ['Dialoge', route.meta.intentGroup, route.meta.title]
                } else if (route.meta.intentGroup && !route.meta.intent) {
                    data.title = ['Dialoge']
                } else {
                    data.title = [...data.title, route.meta.title];
                }
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
     * @private
     * @param {import("vue-router").RouteRecord[]} routes
     * @param {string} basePath
     * @param {string[]} prefixTitle
     */
    getDataForRoute(route, basePath, prefixTitle) {
        const dataGetter = new SkillsWithIntentsDataGetterImpl(route, this.skillsWithIntents);
        return {
            path: path.resolve(basePath, route.path),
            title: [...prefixTitle],
            texts: dataGetter.getTexts(),
            intent: dataGetter.getTechnicalIntentName()
        };
    }

    /**
     * @param {import("vue-router").RouteRecord[]} routes
     */
    filterRoutes(routes) {
        // non intent - routes don't have children
        const filteredRoutes = routes.filter(
            (route) => route.children == null
        )
        return this.setTitleAsIntentName(filteredRoutes);
    }

    /**
     * sets route.intentName to the defined index of route.title (see constants.js)
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