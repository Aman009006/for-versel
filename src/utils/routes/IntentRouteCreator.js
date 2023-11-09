import Layout from '@/layout/index.vue'
import Intents from '@/views/intents/index.vue'
import IntentGroup from '@/views/intents/intent-group/index.vue'
import { paths } from '@/constants'
import { encodePathComponent } from '@/utils/encodePath'

export default class IntentRouteCreator {
    /**
     * @param {Array} skillsWithIntents
     */

    constructor(skillsWithIntents) {
        this.skillsWithIntents = skillsWithIntents
        this.routes = [];
    }

    createIntentRouting() {
        const routes = [];
        this.#sortSkillsWithIntentsAlphabetically();
        const intentRoute = this.#createIntentRoute();
        const intentGroupRoutes = this.#createIntentGroupRoutes()
        const technicalIntentRoutes = this.#createTechnicalIntentRoutes()
        routes.push(intentRoute, intentGroupRoutes, technicalIntentRoutes)
        return routes
    }

    /**
     * sort skillsWithIntents alphabetically by a given key
     */
    #sortSkillsWithIntentsAlphabetically() {
        this.skillsWithIntents.sort(function (a, b) {
            var textA = a.SkillName.toUpperCase();
            var textB = b.SkillName.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }

    #createIntentRoute() {
        const route = {
            path: paths.intents,
            name: 'IntentRoute',
            isIntents: true,
            component: Layout,
            children: [
                {
                    path: paths.intents,
                    component: Intents,
                    props: { intentGroups: this.skillsWithIntents },
                    name: 'Dialoge',
                    meta: {
                        title: 'Dialoge',
                        icon: 'comment',
                    },
                },
            ],
        }
        return route
    }

    /**
     * @returns {Array}
     */
    #createIntentGroupRoutes() {
        const routes = {
            path: '',
            hidden: true,
            isIntents: true,
            name: 'intentGroups',
            component: Layout,
            children: [],
        };
        this.skillsWithIntents.forEach((skillWithIntent) => {
            const specificIntentGroupPath = encodeURIComponent(encodePathComponent(skillWithIntent.SkillName))
            routes.children.push({
                path: `${paths.intents}/${specificIntentGroupPath}`,
                component: IntentGroup,
                props: { intentGroup: skillWithIntent.SkillName, intents: skillWithIntent.Intents },
                // do i really need the names? --> Yes, you can use the name as an identifikator to go to specific routes
                name: `skill-${skillWithIntent.SkillName}`,
                meta: {
                    title: `${skillWithIntent.SkillName}`,
                    parentPath: `#${paths.intents}`,
                },
                children: [],
            })
        })
        return routes
    }

    /**
     * @returns {Array}
     */
    #createTechnicalIntentRoutes() {
        const routes = {
            path: '',
            hidden: true,
            isIntents: true,
            name: 'TechnicalIntents',
            component: Layout,
            children: [],
        };
        this.skillsWithIntents.forEach((skillWithIntent) => {
            const specificIntentGroupPath = encodeURIComponent(encodePathComponent(skillWithIntent.SkillName))
            skillWithIntent.Intents.forEach((intent) => {
                routes.children.push({
                    path: `${paths.intents}/${specificIntentGroupPath}/${encodeURIComponent(encodePathComponent(intent.name))}`,
                    component: () => import('@/views/intents/single-intent/index.vue'),
                    name: `intent-${intent.name}`,
                    meta: {
                        title: `${intent.name}`,
                        intentGroup: `${skillWithIntent.SkillName}`,
                        parentPath: `#${paths.intents}/${specificIntentGroupPath}`,
                        intent: `${intent.intent}`,
                        entity: intent.entity,
                        description: `${intent.description}`,
                        newIntent: intent.newIntent,
                        creationTimestamp: intent.creationTimestamp,
                    },
                })
            })
        })
        return routes
    }
}