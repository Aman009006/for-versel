import { encodePathComponent } from '@/store/modules/permission'

/**
 * @typedef { import('./SkillsWithIntentsDataGetter').default } SkillsWithIntentsDataGetter
 * @implements {SkillsWithIntentsDataGetter}
 */
export default class SkillsWithIntentsDataGetterImpl {
    /**
     * @param {import('vue-router').RouteRecord} route
     * @param {import('./SkillsWithIntents').SkillsWithIntents} skillsWithIntents
     * @returns {import('./SkillsWithIntents').AnswerData}
     */
    getTexts(route, skillsWithIntents) {
        const intentData = this.getIntentData(route, skillsWithIntents);
        return intentData?.texts;
    }

    /**
     * @param {import('vue-router').RouteRecord} route
     * @param {import('./SkillsWithIntents').SkillsWithIntents} skillsWithIntents
     * @returns {string}
     */
    getIntent(route, skillsWithIntents) {
        const intentData = this.getIntentData(route, skillsWithIntents);
        return intentData?.intent;
    }

    /**
     * @private
     * @param {import('vue-router').RouteRecord} route
     * @returns {import('./Intent').Intent}
     */
    getIntentData(route, skillsWithIntents) {
        const intentsFromSkills = skillsWithIntents.map((data) => data.Intents);
        const allIntents = intentsFromSkills.flat();
        const intent = allIntents.find(
            intentElement =>
                encodeURIComponent(encodePathComponent(intentElement.name)) === route.path &&
                // intent - routes don't have children
                route.children == null
        )
        return intent;
    }
}