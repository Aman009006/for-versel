import { encodePathComponent } from '@/store/modules/permission'
import IntentNameGenerator from '../intents/IntentNameGenerator';

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
    getTechnicalIntentName(route, skillsWithIntents) {
        const intentData = this.getIntentData(route, skillsWithIntents);
        if (intentData) {
            const intentNameGenerator = new IntentNameGenerator(intentData.intent, intentData.entity)
            return intentNameGenerator.getTechnicalIntentName();
        } else {
            return null;
        }
    }

    /**
     * @private
     * @param {import('vue-router').RouteRecord} route
     * @param {import('./SkillsWithIntents').SkillsWithIntents} skillsWithIntents
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